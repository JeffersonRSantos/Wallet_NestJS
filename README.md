# 💲Wallet Nestjs

## 📜🚀 Descrição do projeto

<p>Estrutura baseada em microservices, existem 2 serviços, cada um com sua responsabilidade. O serviço principal é <strong>Wallet</strong>, além de ter algumas responsabilidades ele também é responsável por fazer a <strong>interface</strong> e solicitar aos demais serviços seus processamentos de dados.</p>

**Infra dos serviços:**

- Wallet (roda na porta 4000) (serviço principal das requisições)
- Shopping (roda na porta 4001)
- Mysql (roda na porta 3306)

------

**Projeto desenvolvido com os seguintes padrões:**

- POO (Programação Orientada a Objetos)
- S.O.L.I.D
- Clean Architecture
- TDD (e2e)

**Breve conceito S.O.L.I.D:**

```
S — Single Responsiblity Principle (Princípio da responsabilidade única)
O — Open-Closed Principle (Princípio Aberto-Fechado)
L — Liskov Substitution Principle (Princípio da substituição de Liskov)
I — Interface Segregation Principle (Princípio da Segregação da Interface)
D — Dependency Inversion Principle (Princípio da inversão da dependência)
```

- <a href="https://www.techtarget.com/whatis/definition/clean-architecture" target="_blank">Mais Sobre Clean Architecture</a>

## 🚀📜 - Endpoints

1.  GET (/_health) -> Use para saber como está a conectividade dos serviços.
2.  POST (/_register) -> Crie um novo usuário para começar a ultilizar a Wallet.
3.  POST (/_login) -> Autentique seu usuário.
4.  POST (/wallet/_add) -> Carregue com alguns _moneys_ sua carteira.
5.  POST (/wallet/_withdraw) -> Saque a qualquer momento que preferir.
6.  GET (/wallet/_balance) -> Consulte seu saldo.
7.  GET (/wallet/_extract) -> Veja o extrato de todas suas transações.
8.  GET (/shopping/_list_products) -> Agora já podemos adquirir produtos! Veja o catálogo.
9.  POST (/shopping/_buy_product) -> Digite o código do produto e adquira.
10. POST (/shopping/_cancellation) -> Comprou por enquando ou não deseja mais o produto? Use esse endpoint para fazer o cancelamento. (obs: Após a compra de cada produto, o prazo é no máximo 30 minutos para realizar o cancelamento).

## 🚀📜 - SWAGGER

**Antes de mais nada, além de toda essa documentação e utilitários que está na raiz do projeto, temos o Swagger para facilitar ainda mais o uso da API, acesse -> {URL}/docs**


## 🚀▶ - Execute o projeto rodando:

**❌🐳 - Sem docker**

```bash
# install dependences
$ cd ./wallet && cp .env-example .env
```

**Config to .env, ex:**

- SECRET_KEY=(secret on application)
- JWT_EXPIRES_IN=(ex: 1 day)
- DATABASE_URL=(default prisma mysql, ex: mysql://root:root@localhost:3306/wallet_nestjs)
- APP_PORT=(port on current application, ex: 4000, 4001, 4002)
- URL_MICROSERVICE_SHOPPING_PORT=(ex: http://localhost:4001)

continue...

```bash
# Inside path /wallet and /shopping, run:
$ yarn install

# run migrations and seeds **only path (/wallet)**
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

```bash
# Compile images
$ docker-compose up -d

# Run migrates and seeds
$ docker exec -it wallet_app_container /bin/sh -c "npx prisma migrate dev; npx prisma db seed"
```

**Agora já podemos fazer um teste para saber se tudo está em ordem!**

<p>Entre no Swagger/Postman, e execute a rota */_health*</p>

-----------

## 🚀🦾 Testes (End-to-End)

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## 🚀🪧 Próximos passos de upgrade

### Etapa 1

- O microservice responsável por buscar de dados, terá os dados do cache, assim em altas requisições não afetará o banco de dados (DB ReadOnly, Redis).
- WalletInterface seria a segregação do serviço *Wallet*, seria responsável por receber apenas as requisições e chamar os microservices necessários.
- Banco não relacional para logs (alternativa).
- Adicionar microservice de notificações (notificar o usuário dos status dos eventos).
- Tabela para tipagem dos enums (hoje está dentro da aplicação o significado os IDs).
- Fluxo de log para os microservices que recebem solicitações (hoje não salva em nenhum lugar essas informações).
- Microservice para fluxo de emissão de notas, após o cliente adquirir uma compra.

### Etapa 2

- ElasticSearch para logs
- Kubernates para gestão dos containers
- Kafka em um plano de redundância ao Redis


## 🚀🎲Enums

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


## 🚀🦉 Demais informações

- Author - [Jefferson Santos]
- Portfólio - [https://jeffersonfullstackweb.com.br](https://jeffersonfullstackweb.com.br)
- Linkedin - [@jeffersonfullstackweb](https://www.linkedin.com/in/jeffersonfullstackweb/)
- GitHub - [@JeffersonRSantos](https://github.com/JeffersonRSantos)

