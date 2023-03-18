import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../../src/services/database/PrismaService';
import { MessageCustom } from '../../../src/utils/lang/common';

@Controller()
export class AppController {

  constructor(
    private httpService: HttpService
  ) { }

  @Get()
  async index(): Promise<Object> {
    return { message: MessageCustom.WELCOME_TO_WALLET }
  }

  @Get('_health')
  async health(): Promise<Object> {
    const shoppingService = await this.httpService.axiosRef.get(process.env.URL_MICROSERVICE_SHOPPING_PORT + '_health')
    .catch(e => {
      return e
    })

    return {
      Wallet: {
        health: '100%', message: 'Microservice Wallet ON'
      },
      Shopping: (shoppingService?.message ? "Service Unavailable: " + shoppingService.message : shoppingService.data )
    }
  }
}
