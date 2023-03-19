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