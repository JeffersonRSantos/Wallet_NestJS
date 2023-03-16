import { ApiProperty } from "@nestjs/swagger"

export class WalletDTO{
    @ApiProperty()
    value: string
}