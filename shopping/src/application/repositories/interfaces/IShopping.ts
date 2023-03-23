import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { ProductEntities } from "src/application/entities/ProductEntities";
import { TransationEntities } from "src/application/entities/TransactionEntities";
import { BuyProductDTO } from "src/http/dtos/BuyProductDTO";
import { ResponseDTO } from "../implementations/dtos/ResponseDTO";

export abstract class IShopping{
    abstract getListProducts(): Promise<ProductEntities[]>
    abstract buyProduct(body: BuyProductDTO, user: AuthLoginEntities): Promise<ResponseDTO>
    abstract cancellation(code_transaction: string, user: AuthLoginEntities): Promise<TransationEntities>
}