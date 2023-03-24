import { Injectable } from "@nestjs/common";
import { IAuthLogin } from "../../../../src/application/repositories/interfaces/IAuthLogin";
import { AuthLoginDTO } from "../../../../src/http/dtos/AuthLoginDTO";

@Injectable()
export class AuthLoginUseCase{
    constructor(
        private authLoginProvider: IAuthLogin
    ){}

    async execute(props: AuthLoginDTO){
        return await this.authLoginProvider.login(props)
    }
}