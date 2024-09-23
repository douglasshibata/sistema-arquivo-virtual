FROM eclipse-temurin:22
COPY target/desafio-1.0.0.jar desafio.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx256M","-XX:+UseSerialGC","-jar","desafio.jar"]
