import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDTO{
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty({required: false})
    cpf?: string

    @ApiProperty({required: false})
    cnpj?: string
}