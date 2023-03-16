import { WalletProvider } from "src/application/repositories/implementations/WalletProvider";

export class GetBalanceUseCase{
    constructor(
        private walletProvider: WalletProvider
    ){}

    async execute(data: Object){
        return await this.walletProvider.getBalance(data)
    }
}