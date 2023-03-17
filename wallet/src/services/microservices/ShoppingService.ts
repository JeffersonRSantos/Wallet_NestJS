import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ProductEntities } from "src/application/entities/ProductEntities";

@Injectable()
export class ShoppingService{
    constructor(
        private httpService: HttpService
    ){

    }
    async getListProducts(headers: HeadersDTO): Promise<Object>{
        try {
            const { data } = await this.httpService.axiosRef.get<ProductEntities[]>(process.env.URL_MICROSERVICE_SHOPPING_PORT+'_list_products', {
                headers: {
                    "Authorization": headers.authorization
                }
            })
            return data
        } catch (error) {
            throw new Error("Error to service shopping: "+error.message);            
        }
    }
}