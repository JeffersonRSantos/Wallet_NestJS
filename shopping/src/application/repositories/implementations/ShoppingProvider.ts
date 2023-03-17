import { ProductEntities } from "src/application/entities/ProductEntities";
import { PrismaService } from "src/services/database/PrismaService";
import { IShopping } from "../interfaces/IShopping";

export class ShoppingProvider implements IShopping {
    constructor(
        private connectionProvider: PrismaService
    ) { }

    async getListProducts(): Promise<ProductEntities[]> {
        try {
            const products: any = await this.connectionProvider.products.findMany({
                select: {
                    code: true,
                    name: true,
                    description: true,
                    stock: true,
                    price: true
                }
            })
            
            return products
        } catch (error) {
            throw new Error(error);
        }
    }
    async buyProduct(props: Object): Promise<ProductEntities> {
        try {
            return
        } catch (error) {
            throw new Error(error);
        }
    }
}