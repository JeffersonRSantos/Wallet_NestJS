import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { AppController } from './http/controllers/app.controller';
import { ShoppingController } from './http/controllers/shopping.controller';
import { WalletController } from './http/controllers/wallet.controller';
import { ShoppingService } from './services/microservices/ShoppingService';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60,
      maxRedirects: 5,
    }),
  ],
  controllers: [
    AppController,
    WalletController,
    ShoppingController
  ],
  providers: [JwtStrategy, ShoppingService],
})

export class AppModule { }
