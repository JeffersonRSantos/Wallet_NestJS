import { ApiProperty } from "@nestjs/swagger"

export class AuthLoginDTO{
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}