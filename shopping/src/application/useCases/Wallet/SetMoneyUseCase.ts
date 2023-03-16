import { WalletProvider } from "src/application/repositories/implementations/WalletProvider";

export class SetMoneyUseCase{
    constructor(
        private walletProvider: WalletProvider
    ){}

    async execute(data: Object){
        return await this.walletProvider.setMoney(data)
    }
}