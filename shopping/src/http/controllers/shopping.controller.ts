import { Controller, Get, Post, Res, Req, Body, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { ProductEntities } from "src/application/entities/ProductEntities";
import { BuyProductUseCase } from "src/application/useCases/Shopping/BuyProductUseCase";
import { CancellationUseCase } from "src/application/useCases/Shopping/CancellationUseCase";
import { ListProductsUseCase } from "src/application/useCases/Shopping/ListProductsUseCase";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { typeTransactionEnum } from "src/utils/enums";
import { formatCurrencyPt } from "src/utils/formatCurrency";
import { MessageCustomError } from "src/utils/lang/common";
import { BuyProductDTO } from "../dtos/BuyProductDTO";
import { CancellationDTO } from "../dtos/CancellationDTO";

@Controller()
export class ShoppingController {

    constructor(
        private listProductsUseCase: ListProductsUseCase,
        private buyProductUseCase: BuyProductUseCase,
        private cancellationUseCase: CancellationUseCase
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('_list_products')
    @ApiBearerAuth()
    async products(): Promise<ProductEntities[]> {
        try {
            const items = await this.listProductsUseCase.execute()

            for (const [key, item] of Object.entries(items)) {
                item.price = formatCurrencyPt(item.price)
            }

            return items
        } catch (error) {
            throw new Error(MessageCustomError.ERROR_CONTROLLER + " (/_list_products)" + error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('_buy_product')
    @ApiBearerAuth()
    async buyProduct(@Body() body: BuyProductDTO, @Req() req: Request, @Res() resp: Response): Promise<Object> {

        const user: AuthLoginEntities = req.user

        try {
            const items = await this.buyProductUseCase.execute({ body, user })

            return resp.status(200).json(items)
        } catch (error) {
            throw new Error(MessageCustomError.ERROR_CONTROLLER + " (/_buy_product)" + error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('_cancellation')
    @ApiBearerAuth()
    async cancellation(@Body() body: CancellationDTO, @Req() req: Request, @Res() resp: Response): Promise<Object>{

        const user: AuthLoginEntities = req.user
        const { code_transaction } = body
        try {
            let cancel: any = await this.cancellationUseCase.execute({user, code_transaction})            
            
            if(!cancel.status){
                let obj: any = {
                    message: "Successfully Cancellation!",
                    transactionId: cancel.transactionId,
                    value: formatCurrencyPt(parseFloat(cancel.value)),
                    typeTransaction: typeTransactionEnum[(cancel.typeTransaction - 1)]['value']
                }
                if(cancel.product) obj.nameProduct = cancel.product.name
                cancel = obj
            }

            return resp.status(cancel?.status || 200).json({response: cancel})
        } catch (error) {
            throw new Error(MessageCustomError.ERROR_CONTROLLER + " (/_cancellation)" + error.message);
        }
    }
}