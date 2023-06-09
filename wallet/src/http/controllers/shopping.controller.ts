import { Controller, Get, UseGuards, Req, Res, Body, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request, Response } from "express";
import { ResponseDTO } from "src/application/repositories/implementations/dto/ResponseDTO";
import { JwtAuthGuard } from "../../../src/core/guards/jwt-auth.guard";
import { ShoppingService } from "../../../src/services/microservices/ShoppingService";
import { MessageCustom, MessageCustomErrors } from "../../../src/utils/lang/common";
import { BuyProductDTO } from "../dtos/BuyProductDTO";
import { CancellationProductDTO } from "../dtos/CancellationProductDTO";
import { buyProductSchema } from "../schemas/BuyProductSchema";
import { cancellationProductSchema } from "../schemas/cancellationProductSchema";


@Controller('shopping')
export class ShoppingController {
    constructor(
        private shoppingService: ShoppingService
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('_list_products')
    async getListProducts(@Req() req: Request): Promise<ResponseDTO> {
        try {
            const header: any = req.headers
            const resp = await this.shoppingService.getListProducts(header)
            return { response: { message: MessageCustom.WELCOME_TO_SHOPPING, products: resp } }
        } catch (error) {
            throw new Error(MessageCustomErrors.ERROR_CONTROLLER + " (/shopping/_list_products) " + error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('_buy_product')
    async buyProduct(@Req() req: Request, @Body() body: BuyProductDTO, @Res() resp: Response): Promise<Response> {

        const validateSchema = await buyProductSchema(body)

        if (!validateSchema.success) {
            return resp.status(403).json({ error: validateSchema.error.issues[0].message });
        }

        try {
            const header: any = req.headers
            const product = await this.shoppingService.buyProduct(header, body)

            if (!product) return resp.status(500).json({ response: MessageCustomErrors.PRODUCT_NO_EXISTS })
            else return resp.status(200).json({ response: product })
        } catch (error) {
            return resp.status(500).json({
                module: MessageCustomErrors.ERROR_CONTROLLER + " (/shopping/_buy_product) ",
                errorMessage: error.message
            })
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('_cancellation')
    async cancellation(@Req() req: Request, @Body() body: CancellationProductDTO, @Res() resp: Response): Promise<Response> {

        const validateSchema = await cancellationProductSchema(body)

        if (!validateSchema.success) {
            return resp.status(403).json({ error: validateSchema.error.issues[0].message });
        }

        try {
            const header: any = req.headers
            const cancel = await this.shoppingService.cancellationProduct(header, body)

            return resp.status(200).json({ response: cancel })
        } catch (error) {
            return resp.status(500).json({
                module: MessageCustomErrors.ERROR_CONTROLLER + " (/shopping/_cancellation) ",
                errorMessage: error.message
            })
        }
    }
}