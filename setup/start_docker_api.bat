@echo off
docker build -f dockerfiles/api.dockerfile -t hospitalsystem .

docker stop hospitalsystem >nul 2>&1
docker rm hospitalsystem >nul 2>&1

@REM django api
docker run -it --rm ^
    -v %cd%/Backend/hospitalsystem:/HospitalSystem ^
    --name hospitalsystem ^
    -p 8000:8000 ^
    --env-file dockerfiles/api.env.local ^
    --network hospitalsystem-net ^
    hospitalsystem /bin/bash -c "python /code/manage.py makemigrations && python /code/manage.py migrate && python /code/manage.py runserver 0.0.0.0:8000"

docker network connect bridge hospitalsystem
docker logs -f hospitalsystem 
