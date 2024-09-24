# Navegar para o diretório 'desafio'
Set-Location -Path "desafio"


    ./mvnw clean package -DskipTests

Write-Output "Clean package finished!"

# Voltar para o diretório anterior
Set-Location -Path ".."

# Subir os containers com Docker Compose
docker-compose up -d
