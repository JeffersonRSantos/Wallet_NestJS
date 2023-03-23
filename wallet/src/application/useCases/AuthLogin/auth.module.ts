import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../src/services/database/PrismaService';
import { AuthController } from './auth.controller';
import { AuthLoginUseCase } from './AuthLoginUseCase';
import { AuthLoginProvider } from '../../../../src/application/repositories/implementations/AuthLoginProvider';
import { IAuthLogin } from 'src/application/repositories/interfaces/IAuthLogin';

@Module({
  imports: [], //modules
  controllers: [
    AuthController
  ],
  providers: [
    {
      provide: IAuthLogin,
      useClass: AuthLoginProvider
    },
    JwtService,
    PrismaService,
    AuthLoginUseCase
  ], //services
})

export class AuthModule { }
