import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from './application/useCases/AuthLogin/auth.module';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { RegisterModule } from './application/useCases/RegisterUser/register.module';
import { AppController } from './http/controllers/app.controller';
import { ShoppingController } from './http/controllers/shopping.controller';
import { ShoppingService } from './services/microservices/ShoppingService';
import { WalletModule } from './application/useCases/Wallet/wallet.module';

@Module({
  imports: [
    AuthModule,
    RegisterModule,
    WalletModule,
    HttpModule.register({
      timeout: 60,
      maxRedirects: 5,
    })
  ],
  controllers: [
    AppController,
    ShoppingController
  ],
  providers: [
    JwtStrategy, 
    ShoppingService
  ],
})

export class AppModule { }
