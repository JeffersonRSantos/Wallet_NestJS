import { TransationEntities } from "src/application/entities/TransactionEntities";
import { WalletEntities } from "src/application/entities/WalletEntities";

export abstract class IWallet{
    abstract setMoney(props: Object): Promise<Object>
    abstract getMoney(props: Object): Promise<Object>
    abstract getExtract(props: Object): Promise<Object>
    abstract getBalance(props: Object): Promise<WalletEntities>
}