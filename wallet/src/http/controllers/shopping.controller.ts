import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { ApiBasicAuth } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { ShoppingService } from "src/services/microservices/ShoppingService";


@Controller('shopping')
export class ShoppingController{
    constructor(
        private shoppingService: ShoppingService       
    ){}

    @UseGuards(JwtAuthGuard)
    @ApiBasicAuth()
    @Get('_list_products')
    async getListProducts(@Req() req: Request): Promise<any>{
        try {
            const header: any = req.headers
            const resp = await this.shoppingService.getListProducts(header)
            return resp 
        } catch (error) {
            throw new Error(error.message);            
        }
    }
}