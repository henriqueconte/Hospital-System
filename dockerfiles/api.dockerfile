FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY src/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
COPY src /code/

