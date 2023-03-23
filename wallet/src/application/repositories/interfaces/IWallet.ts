import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { TransationEntities } from "src/application/entities/TransactionEntities";
import { WalletEntities } from "src/application/entities/WalletEntities";
import { ResponseDTO } from "../implementations/dto/ResponseDTO";

export abstract class IWallet{
    abstract setMoney(value: string, user: AuthLoginEntities): Promise<ResponseDTO>
    abstract getMoney(value: string, user: AuthLoginEntities): Promise<ResponseDTO>
    abstract getExtract(user: AuthLoginEntities): Promise<TransationEntities[]>
    abstract getBalance(user: AuthLoginEntities): Promise<WalletEntities>
}