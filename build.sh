#!/bin/bash

cd desafio
 ./mvnw clean package -DskipTests
echo "Clean package finished!"
cd ..
docker compose up -d
