import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { authLoginUseCase } from 'src/application/useCases/AuthLogin';
import { registerUserUseCase } from 'src/application/useCases/RegisterUser';
import { PrismaService } from 'src/services/database/PrismaService';
import { messageCustom, messageCustomErrors } from 'src/utils/lang/common';
import { AuthLoginDTO } from '../dtos/AuthLoginDTO';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { authLoginSchema } from '../schemas/AuthLoginSchema';
import { registerUserSchema } from '../schemas/RegisterUserSchema';

@Controller()
export class AppController {
  public registerUser = registerUserUseCase
  public authLogin = authLoginUseCase

  constructor(
    private httpService: HttpService
  ) { }

  @Get()
  async index(): Promise<Object> {
    return { message: messageCustom.WELCOME_TO_WALLET }
  }

  @Get('_health')
  async health(): Promise<Object> {
    const { data } = await this.httpService.axiosRef.get(process.env.URL_MICROSERVICE_SHOPPING_PORT + '_health')

    const prisma = new PrismaService()
    await prisma.$connect()

    return {
      Database: { health: '100%', message: 'Service Mysql ON' },
      Wallet: {
        health: '100%', message: 'Microservice Wallet ON'
      },
      Shopping: data
    }
  }

  @Post('_login')
  async login(@Body() body: AuthLoginDTO, @Res() resp: Response): Promise<Object> {
    try {
      const validateSchema = await authLoginSchema(body)

      if (!validateSchema.success) {
        return resp.status(403).json({ error: validateSchema.error.issues });
      }

      const useCase = await this.authLogin.execute(body)

      resp.status(useCase.status || 200).json({ response: useCase })
    } catch (error) {
      throw new Error(messageCustomErrors.ERROR_CONTROLLER + " (/_login) " + error);
    }
  }

  @Post('_register')
  async createUser(@Body() body: RegisterUserDTO, @Res() res: Response): Promise<Object> {
    try {

      const validateSchema = await registerUserSchema(body)

      if (!validateSchema.success) {
        return res.status(403).json({ error: validateSchema.error.issues });
      }

      const useCase: any = await this.registerUser.execute(body);

      return res.status(useCase?.status || 201).json(useCase)
    } catch (error) {
      throw new Error(messageCustomErrors.ERROR_CONTROLLER + " (/_register) " + error);
    }
  }
}
