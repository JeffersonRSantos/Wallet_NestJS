import { Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {

  @Get('_health')
  async health(): Promise<Object>{
    return {health: '100%', message: 'Microservice Shopping ON'}
  }
}
