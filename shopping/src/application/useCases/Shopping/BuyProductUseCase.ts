import { Injectable } from "@nestjs/common/decorators";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { IShopping } from "src/application/repositories/interfaces/IShopping";
import { BuyProductDTO } from "src/http/dtos/BuyProductDTO";

@Injectable()
export class BuyProductUseCase{
    constructor(
        private buyProductProvider: IShopping
    ){}

    async execute(body: BuyProductDTO, user: AuthLoginEntities){
        return await this.buyProductProvider.buyProduct(body, user)
    }
}