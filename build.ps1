# Navegar para o diretório 'desafio'
Set-Location -Path "desafio"

# Verificar a variável de ambiente M2_HOME
if ($env:M2_HOME) {
    # mvn clean package -Pnative -DskipTests
    mvn clean package -DskipTests
} else {
    ./mvnw clean package -DskipTests
}

Write-Output "Clean package finished!"

# Voltar para o diretório anterior
Set-Location -Path ".."

# Subir os containers com Docker Compose
docker-compose up -d
