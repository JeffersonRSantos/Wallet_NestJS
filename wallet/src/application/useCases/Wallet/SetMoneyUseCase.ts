import { Injectable } from "@nestjs/common";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { IWallet } from "src/application/repositories/interfaces/IWallet";

@Injectable()
export class SetMoneyUseCase{
    constructor(
        private walletProvider: IWallet
    ){}

    async execute(value: string, user: AuthLoginEntities){
        return await this.walletProvider.setMoney(value, user)
    }
}