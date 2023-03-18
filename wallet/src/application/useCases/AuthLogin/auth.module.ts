import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../src/services/database/PrismaService';
import { AuthController } from './auth.controller';
import { AuthLoginUseCase } from './AuthLoginUseCase';
import { AuthLoginProvider } from '../../../../src/application/repositories/implementations/AuthLoginProvider';

@Module({
  imports: [], //modules
  controllers: [
    AuthController
  ],
  providers: [
    JwtService,
    PrismaService,
    AuthLoginUseCase,
    AuthLoginProvider
  ], //services
})

export class AuthModule { }
