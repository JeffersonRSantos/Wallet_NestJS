import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";

export class ListProductsUseCase{
    constructor(
        private shoppingProvider: ShoppingProvider
    ){}

    async execute(){
        return await this.shoppingProvider.getListProducts()
    }
}