
# Sistema Arquivo-Virtual

Criação de um sistema que realiza um CRUD de arquivos virtuais.

**Objetivo**: Implementar um mini sistema de arquivos virtuais.
O sistema deverá permitir operar sobre diretórios e arquivos através de uma API REST, além de 
exibir uma listagem de diretórios em um frontend básico

## Stack utilizada

**Front-end:** Angular 18

**Back-end:** Spring boot 3.3.4

**Database**: PostgreSQL

## Executar com docker

Para executar o projeto rode caso tenha o docker baixado

```bash
 docker compose up -d
```




## Instalação Local

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


## Autor

- [@douglasshibata](https://www.github.com/douglasshibata)



