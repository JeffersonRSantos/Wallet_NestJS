import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";
import { PrismaService } from "src/services/database/PrismaService";
import { BuyProductUseCase } from "./BuyProductUseCase";
import { CancellationUseCase } from "./CancellationUseCase";
import { ListProductsUseCase } from "./ListProductsUseCase";

const ormProvider = new PrismaService()

const shoppingProvider = new ShoppingProvider(
    ormProvider
) 

const getListProductsUseCase = new ListProductsUseCase(
    shoppingProvider
)

const buyProductUseCase = new BuyProductUseCase(
    shoppingProvider
)

const cancellationUseCase = new CancellationUseCase(
    shoppingProvider
)

export {
    getListProductsUseCase,
    buyProductUseCase,
    cancellationUseCase
}