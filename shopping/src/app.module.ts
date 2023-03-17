import { Module } from '@nestjs/common';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { AppController } from './http/controllers/app.controller';
import { ShoppingController } from './http/controllers/shopping.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ShoppingController
  ],
  providers: [JwtStrategy],
})

export class AppModule {}
