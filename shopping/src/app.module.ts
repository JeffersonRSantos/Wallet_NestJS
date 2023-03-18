import { Module } from '@nestjs/common';
import { ShoppingProvider } from './application/repositories/implementations/ShoppingProvider';
import { JwtStrategy } from './application/useCases/AuthLogin/strategy/jwt.strategy';
import { BuyProductUseCase } from './application/useCases/Shopping/BuyProductUseCase';
import { CancellationUseCase } from './application/useCases/Shopping/CancellationUseCase';
import { ListProductsUseCase } from './application/useCases/Shopping/ListProductsUseCase';
import { AppController } from './http/controllers/app.controller';
import { ShoppingController } from './http/controllers/shopping.controller';
import { PrismaService } from './services/database/PrismaService';

@Module({
  imports: [],
  controllers: [
    AppController,
    ShoppingController
  ],
  providers: [
    JwtStrategy,
    ShoppingProvider,
    BuyProductUseCase,
    CancellationUseCase,
    ListProductsUseCase,
    PrismaService
  ],
})

export class AppModule {}
