import { WalletProvider } from "src/application/repositories/implementations/WalletProvider";

export class GetMoneyUseCase{
    constructor(
        private walletProvider: WalletProvider
    ){}

    async execute(data: Object){
        return await this.walletProvider.getMoney(data)
    }
}