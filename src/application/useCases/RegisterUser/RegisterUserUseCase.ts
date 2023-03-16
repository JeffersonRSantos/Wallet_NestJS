import { IRegisterUser } from "src/application/repositories/interfaces/IRegisterUser";

export class RegisterUserUseCase{
    constructor(
        private registerUserProvider: IRegisterUser
    ){}

    async execute(props: Object){
        return await this.registerUserProvider.create({data: props})
    }
}