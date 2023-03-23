import { Injectable } from "@nestjs/common";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { IWallet } from "src/application/repositories/interfaces/IWallet";

@Injectable()
export class GetExtractUseCase{
    constructor(
        private walletProvider: IWallet
    ){}

    async execute(user: AuthLoginEntities){
        return await this.walletProvider.getExtract(user)
    }
}