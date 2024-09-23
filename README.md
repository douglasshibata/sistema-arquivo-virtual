
# Sistema Arquivo-Virtual

Criação de um sistema que realiza um CRUD de arquivos virtuais.

**Objetivo**: Implementar um mini sistema de arquivos virtuais.
O sistema deverá permitir operar sobre diretórios e arquivos através de uma API REST, além de 
exibir uma listagem de diretórios em um frontend básico

## Stack utilizada

**Front-end:** Angular 18

**Back-end:** Spring boot 3.3.4

**Database**: PostgreSQL


## Instalação

Instale front com npm

```bash  
  cd front
  npm install front
```
Instale as dependecias do backend com maven

```bash  
  cd desafio
  ./mvnw clean package -DskipTests
```

## Executar o projeto localmente

Baixar o angular caso não tenha baixado
```bash
npm i -g @angular/cli
```

### Executar o Frontend
```bash
cd front
ng serve -o
```

### Executar o backend
```bash
  cd desafio
  ./mvnw spring-boot:run -DSPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/db_arquivos_virtuais
  ```

## Executar com docker

Para executar o projeto rode o script bash e tenha o docker baixado

```bash
  ./build.sh
```

Caso queira utilizar o powershell pra rodar

```ps1
  .\build.ps1       
```


## Autores

- [@douglasshibata](https://www.github.com/douglasshibata)



