import { Injectable } from "@nestjs/common";
import { WalletProvider } from "../../../../src/application/repositories/implementations/WalletProvider";

@Injectable()
export class GetBalanceUseCase{
    constructor(
        private walletProvider: WalletProvider
    ){}

    async execute(data: Object){
        return await this.walletProvider.getBalance(data)
    }
}