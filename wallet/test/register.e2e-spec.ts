import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Register', () => {
  let app: INestApplication;
  let access_token: string
  
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

    expect(response.status).toEqual(500);
  });

  afterAll(async () => {
    await app.close();
  });
}); 