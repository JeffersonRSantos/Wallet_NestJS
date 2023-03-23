import { Injectable } from "@nestjs/common/decorators";
import { IShopping } from "src/application/repositories/interfaces/IShopping";

@Injectable()
export class ListProductsUseCase{
    constructor(
        private shoppingProvider: IShopping
    ){}

    async execute(){
        return await this.shoppingProvider.getListProducts()
    }
}