@echo off
docker build -f dockerfiles/api.dockerfile -t hospitalsystem .
docker build -f dockerfiles/mysql.dockerfile -t hospitalsystem-db .

# stop old containers
docker stop hospitalsystem-db
docker rm hospitalsystem-db
docker stop hospitalsystem
docker rm hospitalsystem

#network
docker network rm hospitalsystem-net
docker network create hospitalsystem-net

# postgres
docker run -td --rm ^
    --name hospitalsystem-db ^
    -p 3306:3306 ^
    -v mysqldata:/var/lib/mysql ^
    --network hospitalsystem-net ^
    hospitalsystem-db mysqld --default-authentication-plugin=mysql_native_password

echo "waiting 30s for mysql startup"


# django api
docker run -td --rm ^
    -v %cd%/Backend/hospitalsystem:/HospitalSystem ^
    --name hospitalsystem-net ^
    -p 8000:8000 ^
    --network hospitalsystem-net ^
    hospitalsystem /bin/bash -c "python /code/manage.py makemigrations && \
    python /code/manage.py migrate && \
    python /code/manage.py runserver 0.0.0.0:8000"


