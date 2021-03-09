FROM python:3
ENV PYTHONUNBUFFERED=1
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_HOST=hospitalsystem-db

WORKDIR /code
COPY Backend/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
COPY Backend/HospitalSystem /code/


