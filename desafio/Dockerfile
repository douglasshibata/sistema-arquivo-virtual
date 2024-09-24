FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal
COPY target/desafio-1.0.0.jar desafio.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx256M","-XX:+UseSerialGC","-jar","desafio.jar"]
