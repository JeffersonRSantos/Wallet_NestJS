import { ApiProperty } from "@nestjs/swagger";

export class CancellationProductDTO{
    @ApiProperty()
    public code_transaction: string
}