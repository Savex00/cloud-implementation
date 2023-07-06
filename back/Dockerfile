FROM python:3.9.5-slim-buster

WORKDIR /app

RUN apt-get update && apt-get -y install python3-sqlalchemy
COPY app.py ./

COPY requirements.txt .
RUN pip3 install -r requirements.txt

EXPOSE 5000
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port","5000"]