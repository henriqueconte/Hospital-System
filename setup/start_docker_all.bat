@echo off
docker build -f dockerfiles/api.dockerfile -t hospitalsystem .
docker build -f dockerfiles/mysql.dockerfile -t hospitalsystem-db .

@REM stop old containers
docker stop hospitalsystem-db >nul 2>&1
docker rm hospitalsystem-db >nul 2>&1
docker stop hospitalsystem >nul 2>&1
docker rm hospitalsystem >nul 2>&1

@REM network
docker network rm hospitalsystem-net >nul 2>&1
docker network create hospitalsystem-net >nul 2>&1

@REM mysql
docker run -td --rm ^
    --name hospitalsystem-db ^
    -p 3306:3306 ^
    --network hospitalsystem-net ^
    hospitalsystem-db mysqld --default-authentication-plugin=mysql_native_password

echo "waiting 3m for mysql startup"
timeout /t 180 /nobreak

@REM django api
docker run -it --rm ^
    -v %cd%/Backend/hospitalsystem:/HospitalSystem ^
    --name hospitalsystem ^
    -p 8000:8000 ^
    --network hospitalsystem-net ^
    --env-file dockerfiles/api.env.local ^
    hospitalsystem /bin/bash -c "python /code/manage.py makemigrations && python /code/manage.py migrate && python /code/manage.py runserver 0.0.0.0:8000"


docker network connect bridge hospitalsystem
docker network connect bridge hospitalsystem-db
docker logs -f hospitalsystem 