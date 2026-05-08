FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /build

COPY src/CalculatorApp.java ./src/CalculatorApp.java

RUN mkdir -p out \
    && javac -d out src/CalculatorApp.java \
    && jar --create --file calc.jar --main-class CalculatorApp -C out .

FROM eclipse-temurin:17-jre-jammy

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /opt/calc

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        imagemagick \
        libfreetype6 \
        libfontconfig1 \
        libxext6 \
        libxi6 \
        libxrender1 \
        libxtst6 \
        xvfb \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /build/calc.jar /opt/calc/calc.jar

CMD ["java", "-jar", "/opt/calc/calc.jar"]
