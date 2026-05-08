FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /opt/app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        imagemagick \
        python3-tk \
        xvfb \
    && rm -rf /var/lib/apt/lists/*

COPY app.py /opt/app/app.py

CMD ["python3", "/opt/app/app.py"]
