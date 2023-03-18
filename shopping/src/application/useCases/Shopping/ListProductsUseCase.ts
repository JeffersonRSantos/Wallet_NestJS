import { Injectable } from "@nestjs/common/decorators";
import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";

@Injectable()
export class ListProductsUseCase{
    constructor(
        private shoppingProvider: ShoppingProvider
    ){}

    async execute(){
        return await this.shoppingProvider.getListProducts()
    }
}