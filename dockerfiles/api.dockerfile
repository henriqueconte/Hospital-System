FROM python:3
ENV PYTHONUNBUFFERED=1

WORKDIR /code
COPY Backend/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
COPY Backend/HospitalSystem /code/

CMD python /code/manage.py runserver 0.0.0.0:8000