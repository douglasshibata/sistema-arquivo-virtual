#!/bin/bash

cd desafio
# Check for M2_HOME environment variable
if [[ -n "$M2_HOME" ]]; then
# mvn clean package -Pnative  -DskipTests
  mvn clean package -DskipTests
else
  ./mvnw clean package -DskipTests
fi
echo "Clean package finished!"
cd ..
docker compose up -d