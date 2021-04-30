#! /bin/bash

docker run -ti --rm \
    -v "$(pwd)"/Backend/HospitalSystem:/code \
    --name hospitalsystem \
    -p 8000:8000 \
    --env-file dockerfiles/api.env.local \
    --network hospitalsystem-net \
    hospitalsystem /bin/bash -c "python /code/manage.py makemigrations && \
    python /code/manage.py migrate && \
    python /code/manage.py loaddata fake_data.json && \
    python /code/manage.py test"
