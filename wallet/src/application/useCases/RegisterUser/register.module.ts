import { Module } from '@nestjs/common';
import { RegisterUserProvider } from '../../../../src/application/repositories/implementations/RegisterUserProvider';
import { PrismaService } from '../../../../src/services/database/PrismaService';
import { RegisterController } from './register.controller';
import { RegisterUserUseCase } from './RegisterUserUseCase';

@Module({
  imports: [], //modules
  controllers: [
    RegisterController
  ],
  providers: [
    RegisterUserUseCase,
    RegisterUserProvider,
    PrismaService
  ], //services
})

export class RegisterModule { }
