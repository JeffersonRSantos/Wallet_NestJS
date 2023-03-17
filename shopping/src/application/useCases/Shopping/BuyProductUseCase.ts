import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";

export class BuyProductUseCase{
    constructor(
        private buyProductProvider: ShoppingProvider
    ){}

    async execute(props: Object){
        return await this.buyProductProvider.buyProduct(props)
    }
}