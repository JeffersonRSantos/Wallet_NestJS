import { WalletProvider } from "src/application/repositories/implementations/WalletProvider";
import { PrismaService } from "src/services/database/PrismaService";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { GetExtractUseCase } from "./GetExtractUseCase";
import { GetMoneyUseCase } from "./GetMoneyUseCase";
import { SetMoneyUseCase } from "./SetMoneyUseCase";

const ormProvider = new PrismaService

const walletProvider = new WalletProvider(
    ormProvider
)

const setMoneyUseCase = new SetMoneyUseCase(
    walletProvider
)

const getMoneyUseCase = new GetMoneyUseCase(
    walletProvider
)

const getExtractUseCase = new GetExtractUseCase(
    walletProvider
)

const getBalanceUseCase = new GetBalanceUseCase(
    walletProvider
)

export {
    setMoneyUseCase,
    getMoneyUseCase,
    getExtractUseCase,
    getBalanceUseCase
}