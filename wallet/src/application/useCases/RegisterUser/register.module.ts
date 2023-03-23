import { Module } from '@nestjs/common';
import { IRegisterUser } from 'src/application/repositories/interfaces/IRegisterUser';
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
    { provide: IRegisterUser, useClass: RegisterUserProvider},
    RegisterUserUseCase,
    PrismaService
  ], //services
})

export class RegisterModule { }
