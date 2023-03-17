import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ProductEntities } from "src/application/entities/ProductEntities";
import { BuyProductDTO } from "src/http/dtos/BuyProductDTO";
import { CancellationProductDTO } from "src/http/dtos/CancellationProductDTO";

@Injectable()
export class ShoppingService {
    constructor(
        private httpService: HttpService
    ) { }

    async getListProducts(headers: HeadersDTO): Promise<Object> {
        try {
            const { data } = await this.httpService.axiosRef.get<ProductEntities[]>(process.env.URL_MICROSERVICE_SHOPPING_PORT + '_list_products', {
                headers: {
                    "Authorization": headers.authorization
                }
            })
            return data
        } catch (error) {
            throw new Error("Service: (getListProducts) " + error.message);
        }
    }

    async buyProduct(headers: HeadersDTO, body: BuyProductDTO): Promise<Object> {
        try {
            const { data } = await this.httpService.axiosRef.post(process.env.URL_MICROSERVICE_SHOPPING_PORT + '_buy_product',
                body, {
                headers: {
                    "Authorization": headers.authorization
                }
            })
            return data
        } catch (error) {
            throw new Error("Service (buyProduct): " + error.message);
        }
    }

    async cancellationProduct(headers: HeadersDTO, body: CancellationProductDTO): Promise<Object> {
        try {
            const { data } = await this.httpService.axiosRef.post(process.env.URL_MICROSERVICE_SHOPPING_PORT + '_cancellation',
                body, {
                headers: {
                    "Authorization": headers.authorization
                }
            })
            return data
        } catch (error) {
            throw new Error("Service (cancellationProduct): " + error.message);
        }
    }
}