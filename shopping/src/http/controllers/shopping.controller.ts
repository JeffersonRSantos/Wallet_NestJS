import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ProductEntities } from "src/application/entities/ProductEntities";
import { getListProducts } from "src/application/useCases/Shopping";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { formatCurrencyPt } from "src/utils/formatCurrency";

@Controller()
export class ShoppingController{
    public listProduct = getListProducts

    @UseGuards(JwtAuthGuard)
    @Get('_list_products')
    @ApiBearerAuth()
    async products(): Promise<ProductEntities[]>{
        try {
            const items = await this.listProduct.execute()

            for(const [key, item] of Object.entries(items)){
                item.price = formatCurrencyPt(item.price)
            }

            return items
        } catch (error) {
            throw new Error("Error to controller: "+error.message);            
        }
    }
}