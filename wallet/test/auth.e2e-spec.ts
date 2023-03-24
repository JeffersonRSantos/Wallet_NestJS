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

    expect(response.status).toEqual(401);
  });

  afterAll(async () => {
    await app.close();
  });
}); 