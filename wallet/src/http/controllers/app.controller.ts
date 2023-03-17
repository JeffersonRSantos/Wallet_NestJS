import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { authLoginUseCase } from 'src/application/useCases/AuthLogin';
import { registerUserUseCase } from 'src/application/useCases/RegisterUser';
import { AuthLoginDTO } from '../dtos/AuthLoginDTO';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { authLoginSchema } from '../schemas/AuthLoginSchema';
import { registerUserSchema } from '../schemas/RegisterUserSchema';

@Controller()
export class AppController {
  public registerUser = registerUserUseCase
  public authLogin = authLoginUseCase

  @Get()
  async index(): Promise<Object> {
    return { message: 'Welcome to Wallet NestJS' }
  }
  
  @Get('_health')
  async health(): Promise<Object> {
    return { health: '100%', message: 'Microservice Wallet ON' }
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
      throw new Error("Erro to controller: " + error);
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
      throw new Error(error.message);

    }
  }
}
