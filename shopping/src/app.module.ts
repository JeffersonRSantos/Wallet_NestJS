import { Module } from '@nestjs/common';
import { ShoppingProvider } from './application/repositories/implementations/ShoppingProvider';
import { IShopping } from './application/repositories/interfaces/IShopping';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { BuyProductUseCase } from './application/useCases/Shopping/BuyProductUseCase';
import { CancellationUseCase } from './application/useCases/Shopping/CancellationUseCase';
import { ListProductsUseCase } from './application/useCases/Shopping/ListProductsUseCase';
import { AppController } from './http/controllers/app.controller';
import { ShoppingController } from './application/useCases/Shopping/shopping.controller';
import { PrismaService } from './services/database/PrismaService';

@Module({
  imports: [],
  controllers: [
    AppController,
    ShoppingController
  ],
  providers: [
    { provide: IShopping, useClass: ShoppingProvider},
    JwtStrategy,
    BuyProductUseCase,
    CancellationUseCase,
    ListProductsUseCase,
    PrismaService
  ],
})

export class AppModule {}
