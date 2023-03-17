import { ProductEntities } from "src/application/entities/ProductEntities";

export abstract class IShopping{
    abstract getListProducts(): Promise<ProductEntities[]>
    abstract buyProduct(props: Object): Promise<ProductEntities>
}