import { ProductEntities } from "src/application/entities/ProductEntities";
import { TransationEntities } from "src/application/entities/TransactionEntities";

export abstract class IShopping{
    abstract getListProducts(): Promise<ProductEntities[]>
    abstract buyProduct(props: Object): Promise<Object>
    abstract cancellation(props: Object): Promise<TransationEntities>
}