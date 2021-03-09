#! /bin/bash

#build containers
docker build -f dockerfiles/api.dockerfile -t hospitalsystem .
docker build -f dockerfiles/postgres.dockerfile -t hospitalsystem-db .

# stop old containers
docker stop hospitalsystem-db 2>/dev/null
docker rm hospitalsystem-db 2>/dev/null
docker stop hospitalsystem 2>/dev/null
docker rm hospitalsystem 2>/dev/null

#network
docker network rm hospitalsystem-net 2>/dev/null
docker network create hospitalsystem-net

# postgres
docker run -td --rm \
    --name hospitalsystem-db \
    -p 5432:5432 \
    --network hospitalsystem-net \
    hospitalsystem-db

# django api
docker run -td --rm \
    -v "$(pwd)"/src:/code \
    --name hospitalsystem \
    -p 8000:8000 \
    --network hospitalsystem-net \
    hospitalsystem /code/manage.py runserver 0.0.0.0:8000

docker network connect bridge hospitalsystem