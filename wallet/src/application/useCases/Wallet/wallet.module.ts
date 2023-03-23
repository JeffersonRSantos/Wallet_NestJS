import { Module } from '@nestjs/common';
import { IWallet } from 'src/application/repositories/interfaces/IWallet';
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
    { provide: IWallet, useClass: WalletProvider },
    GetBalanceUseCase,
    GetExtractUseCase,
    GetMoneyUseCase,
    SetMoneyUseCase,
    JwtStrategy,
    PrismaService
  ],
})

export class WalletModule { }
