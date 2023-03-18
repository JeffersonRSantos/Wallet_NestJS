import { ApiProperty } from "@nestjs/swagger"

export class BuyProductDTO{
    @ApiProperty()
    public code_product: string

    @ApiProperty()
    public amount: number
}