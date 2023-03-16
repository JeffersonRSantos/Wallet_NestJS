import { Module } from '@nestjs/common';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { AppController } from './http/controllers/app.controller';
import { WalletController } from './http/controllers/wallet.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    WalletController
  ],
  providers: [JwtStrategy],
})

export class AppModule {}
