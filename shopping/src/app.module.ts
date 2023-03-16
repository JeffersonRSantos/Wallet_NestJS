import { Module } from '@nestjs/common';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { AppController } from './http/controllers/app.controller';
import * as process from 'process'

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [JwtStrategy],
})

export class AppModule {}
