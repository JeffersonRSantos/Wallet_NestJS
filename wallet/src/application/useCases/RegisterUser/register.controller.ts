import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserUseCase } from '../../../../src/application/useCases/RegisterUser/RegisterUserUseCase';
import { RegisterUserDTO } from '../../../../src/http/dtos/RegisterUserDTO';
import { registerUserSchema } from '../../../../src/http/schemas/RegisterUserSchema';
import { MessageCustomErrors } from '../../../../src/utils/lang/common';

@Controller()
export class RegisterController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase
  ) { }

  @Post('_register')
  async createUser(@Body() body: RegisterUserDTO, @Res() res: Response): Promise<Object> {
    try {

      const validateSchema = await registerUserSchema(body)

      if (!validateSchema.success) {
        return res.status(403).json({ error: validateSchema.error.issues });
      }

      const useCase: any = await this.registerUserUseCase.execute(body);

      return res.status(useCase?.status || 201).json(useCase)
    } catch (error) {
      throw new Error(MessageCustomErrors.ERROR_CONTROLLER + " (/_register) " + error);
    }
  }
}
