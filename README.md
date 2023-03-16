# Wallet Nestjs

------------------------

**Projeto desenvolvido com os seguintes padrões:**

- POO (Programação Orientada a Objetos)
- S.O.L.I.D
- Clean Architecture

Breve conceito S.O.L.I.D:

```
S — Single Responsiblity Principle (Princípio da responsabilidade única)
O — Open-Closed Principle (Princípio Aberto-Fechado)
L — Liskov Substitution Principle (Princípio da substituição de Liskov)
I — Interface Segregation Principle (Princípio da Segregação da Interface)
D — Dependency Inversion Principle (Princípio da inversão da dependência)
```

- <a href="https://www.techtarget.com/whatis/definition/clean-architecture" target="_blank">Mais Sobre Clean Architecture</a>

------------------

## 🚀📜 - SWAGGER

**Antes de mais nada, além de toda essa documentação e utilitários que está na raiz do projeto, temos o Swagger para facilitar ainda mais o uso da API, acesse -> {URL}/docs**

------------------

## 🚀▶ - Execute o projeto rodando:

**❌🐳 - Sem docker**

```bash
# install dependences
$ yarn install

# run migrations
$ npx prisma migrate dev
```
- Execute

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

**✅🐳 - Com docker**

--------

## Testes

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

----------------------

## Próximos passos de upgrade

### Etapa 1

- O microservice responsável por buscar de dados, terá os dados do cache, assim em altas requisições não afetará o banco de dados (DB ReadOnly, Redis)
- Banco não relacional para logs 
- Adicionar microservice de notificações (notificar o usuário dos status dos eventos)
- API enviará a solicitação para uma fila e terá ali 1 ou mais workers para despache da solicitação ao 

### Etapa 2

- ElasticSearch para logs
- Kubernates para gestão dos containers
- Kafka em um plano de redundância ao Redis

----------------

## Enums

### TypeTransaction

1. deposit
2. withdraw
3. buy

### StatusTransaction

1. processing
2. success
3. canceled
4. reversal
5. failed


----------------

## Demais informações

- Author - [Jefferson Santos]
- Portfólio - [https://jeffersonfullstackweb.com.br](https://jeffersonfullstackweb.com.br)
- Linkedin - [@jeffersonfullstackweb](https://www.linkedin.com/in/jeffersonfullstackweb/)
- GitHub - [@JeffersonRSantos](https://github.com/JeffersonRSantos)

