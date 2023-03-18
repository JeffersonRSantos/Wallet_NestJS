import { Injectable } from "@nestjs/common/decorators";
import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";

@Injectable()
export class BuyProductUseCase{
    constructor(
        private buyProductProvider: ShoppingProvider
    ){}

    async execute(props: Object){
        return await this.buyProductProvider.buyProduct(props)
    }
}