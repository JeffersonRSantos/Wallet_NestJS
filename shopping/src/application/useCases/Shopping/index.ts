import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";
import { PrismaService } from "src/services/database/PrismaService";
import { ListProductsUseCase } from "./ListProductsUseCase";

const ormProvider = new PrismaService()

const shoppingProvider = new ShoppingProvider(
    ormProvider
) 

const getListProducts = new ListProductsUseCase(
    shoppingProvider
)

export {
    getListProducts
}