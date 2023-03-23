import { Injectable } from "@nestjs/common";
import { IRegisterUser } from "src/application/repositories/interfaces/IRegisterUser";
import { RegisterUserDTO } from "src/http/dtos/RegisterUserDTO";

@Injectable()
export class RegisterUserUseCase{
    constructor(
        private registerUserProvider: IRegisterUser
    ){}

    async execute(props: RegisterUserDTO){
        return await this.registerUserProvider.create(props)
    }
}