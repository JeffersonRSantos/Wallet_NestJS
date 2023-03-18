import { Injectable } from "@nestjs/common";
import { WalletProvider } from "../../../../src/application/repositories/implementations/WalletProvider";

@Injectable()
export class GetExtractUseCase{
    constructor(
        private walletProvider: WalletProvider
    ){}

    async execute(data: Object){
        return await this.walletProvider.getExtract(data)
    }
}