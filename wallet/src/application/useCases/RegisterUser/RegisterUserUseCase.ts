import { Injectable } from "@nestjs/common";
import { RegisterUserProvider } from "../../../../src/application/repositories/implementations/RegisterUserProvider";
import { IRegisterUser } from "src/application/repositories/interfaces/IRegisterUser";

@Injectable()
export class RegisterUserUseCase{
    constructor(
        private registerUserProvider: RegisterUserProvider
    ){}

    async execute(props: Object){
        return await this.registerUserProvider.create({data: props})
    }
}