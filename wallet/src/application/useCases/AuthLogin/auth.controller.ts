import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginUseCase } from '../../../../src/application/useCases/AuthLogin/AuthLoginUseCase';
import { AuthLoginDTO } from '../../../../src/http/dtos/AuthLoginDTO';
import { authLoginSchema } from '../../../../src/http/schemas/AuthLoginSchema';
import { MessageCustomErrors } from '../../../../src/utils/lang/common';

@Controller()
export class AuthController {

  constructor(
    private authLoginUseCase: AuthLoginUseCase
  ) { }


  @Post('_login')
  async login(@Body() body: AuthLoginDTO, @Res() resp: Response): Promise<Object> {
    try {
      const validateSchema = await authLoginSchema(body)

      if (!validateSchema.success) {
        return resp.status(403).json({ error: validateSchema.error.issues });
      }

      const useCase = await this.authLoginUseCase.execute(body)

      resp.status(useCase.status || 200).json({ response: useCase })
    } catch (error) {
      throw new Error(MessageCustomErrors.ERROR_CONTROLLER + " (/_login) " + error);
    }
  }

}
