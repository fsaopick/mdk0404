FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        imagemagick \
        x11-apps \
        xvfb \
    && rm -rf /var/lib/apt/lists/*

CMD ["xeyes"]
