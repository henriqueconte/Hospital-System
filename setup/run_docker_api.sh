#! /bin/bash
# django api
docker rm hospitalsystem-db 2>/dev/null
docker stop hospitalsystem 2>/dev/null


docker run -ti --rm \
    -v "$(pwd)"/Backend/HospitalSystem:/code \
    --name hospitalsystem \
    -p 8000:8000 \
    --env-file dockerfiles/api.env.local \
    --network hospitalsystem-net \
    hospitalsystem /bin/bash -c "python /code/manage.py makemigrations && \
    python /code/manage.py migrate && \
    python /code/manage.py runserver 0.0.0.0:8000"

