import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Login', () => {
  let app: INestApplication;
  let access_token: string
  let products: any
  let extract: any

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  //Login

  it(`/_login - Login Authentication`, async () => {
    const response = await request(app.getHttpServer())
      .post('/_login')
      .type('json')
      .send({ email: "jefferson@teste.com", password: "554433" })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    access_token = response.text
    expect(response.status).toEqual(200);
  });

  it(`/_login - Login no Authentication`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/_login')
      .type('json')
      .send({ email: "joao@teste.com", password: "0000" })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(response.status).toEqual(403);
  });

  //Register

  it(`/_register - Register to new user`, async () => {
    const response = await request(app.getHttpServer())
      .post('/_register')
      .type('json')
      .send({ name: "João Pedro", email: "joao@pedro.com", password: "10203040", cpf: "47389723477" })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(response.status).toEqual(201);
  });

  it(`/_register - Double register -> Should to be return user exists `, async () => {
    const response = await request(app.getHttpServer())
      .post('/_register')
      .type('json')
      .send({ name: "João Pedro", email: "joao@pedro.com", password: "10203040", cpf: "47389723477" })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(response.status).toEqual(409);
  });

  // wallet/_add

  it(`/wallet/_add - Add money (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/wallet/_add')
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .send({ value: "25,00" })
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(201)
  });

  it(`/wallet/_add - Parameter invalid (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/wallet/_add')
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .send({ vale: "20,00" })
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(403)
  });

  it(`/wallet/_add - without authentication (no Auth)`, async () => {
    const response = await request(app.getHttpServer())
      .post('/wallet/_add')
      .set('Accept', 'application/json')
      .send({ value: "20,00" })
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(401)
  });

  // wallet/_withdraw

  it(`/wallet/_withdraw - Withdraw money (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/wallet/_withdraw')
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .send({ value: "11,24" })
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/wallet/_withdraw - Parameter invalid (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/wallet/_withdraw')
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .send({ vale: "10,00" })
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(403)
  });

  it(`/wallet/_withdraw - without authentication (no Auth)`, async () => {
    const response = await request(app.getHttpServer())
      .post('/wallet/_withdraw')
      .set('Accept', 'application/json')
      .send({ value: "10,00" })
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(401)
  });

  // wallet/_balance

  it(`/wallet/_balance - Should to return balance (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .get('/wallet/_balance')
      .set({ Authorization: 'Bearer ' + token })

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/wallet/_balance - Should to be error to get balance (no Auth)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/wallet/_balance')

    console.log(response.text)
    expect(response.status).toEqual(401)
  });

  // wallet/_extract

  it(`/wallet/_extract - Should to return extract list (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .get('/wallet/_extract')
      .set({ Authorization: 'Bearer ' + token })

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/wallet/_extract - Should to return error to extract list (no Auth)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/wallet/_extract')

    console.log(response.text)
    expect(response.status).toEqual(401)
  });

  // shopping/_list_products

  it(`/shopping/_list_products - Should to return products list (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .get('/shopping/_list_products')
      .set({ Authorization: 'Bearer ' + token })

    console.log(response.text)
    products = JSON.parse(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/shopping/_list_products - Should to return error to products list (no Auth)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/shopping/_list_products')

    console.log(response.text)
    expect(response.status).toEqual(401)
  });

  // shopping/_buy_product

  it(`/shopping/_buy_product - Buy product by code (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token

    const response = await request(app.getHttpServer())
      .post('/shopping/_buy_product')
      .send({ code_product: products.products[1].code, amount: 1 })
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/shopping/_buy_product - Product out of stock (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/shopping/_buy_product')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({ code_product: products.products[(products.products.length - 1)].code, amount: 1 })
      .set({ Authorization: 'Bearer ' + token })

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/shopping/_buy_product - Insufficient balance (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/shopping/_buy_product')
      .send({ code_product: products.products[(products.products.length - 2)].code, amount: 1 })
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  // wallet/_extract (required for last module test)

  it(`/wallet/_extract - Should to return extract list (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .get('/wallet/_extract')
      .set({ Authorization: 'Bearer ' + token })

    console.log(response.text)
    extract = JSON.parse(response.text)
    expect(response.status).toEqual(200)
  });

  // shopping/_cancellation

  it(`/shopping/_cancellation - Should to be cancellation transaction (Auth)`, async () => {
    let token = JSON.parse(access_token).response.bearer_token
    const response = await request(app.getHttpServer())
      .post('/shopping/_cancellation')
      .send({ code_transaction: extract.response[(extract.response.length - 1)].transactionId })
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(200)
  });

  it(`/shopping/_cancellation - Should to be error to cancellation transaction (no Auth)`, async () => {
    const response = await request(app.getHttpServer())
      .post('/shopping/_cancellation')
      .send({ code_transaction: extract.response[(extract.response.length - 1)].transactionId })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')

    console.log(response.text)
    expect(response.status).toEqual(401)
  });

  afterAll(async () => {
    await app.close();
  });
}); 