#! /bin/bash

#build containers
docker build -f dockerfiles/api.dockerfile -t hospitalsystem .
docker build -f dockerfiles/mysql.dockerfile -t hospitalsystem-db .

# stop old containers
docker stop hospitalsystem-db 2>/dev/null
docker rm hospitalsystem-db 2>/dev/null
docker stop hospitalsystem 2>/dev/null
docker rm hospitalsystem 2>/dev/null

#network
docker network rm hospitalsystem-net 2>/dev/null
docker network create hospitalsystem-net

# mysql
docker run -td --rm \
    --name hospitalsystem-db \
    -p 3306:3306 \
    -v mysqldata:/var/lib/mysql \
    --network hospitalsystem-net \
    hospitalsystem-db mysqld --default-authentication-plugin=mysql_native_password


echo "waiting 30s for mysql startup"
# wait for mysql startup
sleep 30s

# django api
docker run -ti --rm \
    -v "$(pwd)"/Backend/HospitalSystem:/code \
    --name hospitalsystem \
    -p 8000:8000 \
    --network hospitalsystem-net \
    hospitalsystem /bin/bash -c "python /code/manage.py makemigrations && \
    python /code/manage.py migrate && \
    python /code/manage.py runserver 0.0.0.0:8000"

docker network connect bridge hospitalsystem
docker network connect bridge hospitalsystem-db
docker logs -f hospitalsystem 


