import { Injectable } from "@nestjs/common";
import { AuthLoginProvider } from "../../../../src/application/repositories/implementations/AuthLoginProvider";

@Injectable()
export class AuthLoginUseCase{
    constructor(
        private authLoginProvider: AuthLoginProvider
    ){}

    async execute(props: Object){
        return await this.authLoginProvider.login(props)
    }
}