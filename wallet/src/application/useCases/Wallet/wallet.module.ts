import { Module } from '@nestjs/common';
import { WalletProvider } from '../../../../src/application/repositories/implementations/WalletProvider';
import { PrismaService } from '../../../../src/services/database/PrismaService';
import { JwtStrategy } from '../AuthLogin/strategy/jwt.strategy';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { GetExtractUseCase } from './GetExtractUseCase';
import { GetMoneyUseCase } from './GetMoneyUseCase';
import { SetMoneyUseCase } from './SetMoneyUseCase';
import { WalletController } from './wallet.controller';

@Module({
  imports: [],
  controllers: [
    WalletController
  ],
  providers: [
    GetBalanceUseCase,
    GetExtractUseCase,
    GetMoneyUseCase,
    SetMoneyUseCase,
    JwtStrategy,
    PrismaService,
    WalletProvider
  ],
})

export class WalletModule { }
