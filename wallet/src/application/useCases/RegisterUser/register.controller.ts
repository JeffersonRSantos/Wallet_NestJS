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
  async createUser(@Body() body: RegisterUserDTO, @Res() res: Response): Promise<Response> {
    try {

      const validateSchema = await registerUserSchema(body)

      if (!validateSchema.success) {
        return res.status(403).json({ error: validateSchema.error.issues });
      }
      
      await this.registerUserUseCase.execute(body);

      return res.status(201).json()
    } catch (error) {
      return res.status(500).json({
        module: MessageCustomErrors.ERROR_CONTROLLER + " (/_register) ",
        errorMessage: error.message
      })
    }
  }
}
