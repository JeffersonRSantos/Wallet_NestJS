import { Injectable } from "@nestjs/common/decorators";
import { randomUUID } from "crypto";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { TransationEntities } from "../../../../src/application/entities/TransactionEntities";
import { WalletEntities } from "../../../../src/application/entities/WalletEntities";
import { PrismaService } from "../../../../src/services/database/PrismaService";
import { statusTransactionConstantEnum, statusTransactionEnum, typeTransactionConstantEnum, typeTransactionEnum } from "../../../../src/utils/enums";
import { formatCurrencyPt } from "../../../../src/utils/formatCurrency";
import { MessageCustom, MessageCustomErrors, MessageCustomSuccess } from "../../../../src/utils/lang/common";
import { IWallet } from "../interfaces/IWallet";
import { ResponseDTO } from "./dto/ResponseDTO";

@Injectable()
export class WalletProvider implements IWallet {
    constructor(
        private connectionProvider: PrismaService
    ) { }

    public dataCreateTransaction: any

    async setMoney(value: string, user: AuthLoginEntities): Promise<ResponseDTO> {

        const formatCurrency = parseFloat(value.replace(',', '.'));

        const uuidTransaction = randomUUID()

        let transaction: TransationEntities = {
            transactionId: uuidTransaction,
            value: formatCurrency,
            userId: user.id,
            typeTransaction: typeTransactionConstantEnum.DEPOSIT
        }

        try {

            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.transaction.create(this.dataCreateTransaction)

            return await this.connectionProvider.$transaction(async (tx) => {

                const getWallet: WalletEntities = await tx.wallet.findUnique({
                    where: { userId: user.id }
                })

                if (!getWallet) throw new Error(MessageCustomErrors.USER_NO_EXISTS);

                const updateValue = (parseFloat(getWallet.balance) + formatCurrency)
                const updateBalance = await tx.wallet.update({
                    where: { userId: user.id },
                    data: { balance: updateValue }
                })

                if (!updateBalance) throw new Error(MessageCustomErrors.ERROR_UPDATE_BALANCE);

                transaction.statusTransaction = statusTransactionConstantEnum.SUCCESS

                this.dataCreateTransaction = { data: transaction }
                await tx.transaction.create(this.dataCreateTransaction)

                return { response: { message: MessageCustomSuccess.DEPOSIT_SUCCESSFULLY } }
            })

        } catch (error) {

            transaction.statusTransaction = statusTransactionConstantEnum.FAILED
            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.transaction.create(this.dataCreateTransaction)

            throw new Error(error);

        }
    }

    async getMoney(value: string, user: AuthLoginEntities): Promise<ResponseDTO> {

        const formatCurrency = parseFloat(value.replace(',', '.'));

        const uuidTransaction = randomUUID()

        let transaction: TransationEntities = {
            transactionId: uuidTransaction,
            value: formatCurrency,
            userId: user.id,
            typeTransaction: typeTransactionConstantEnum.WITHDRAW
        }

        try {

            return await this.connectionProvider.$transaction(async (tx) => {

                const getWallet: WalletEntities = await tx.wallet.findUnique({
                    where: { userId: user.id }
                })
    
                const value = formatCurrency
                const balance = parseFloat(getWallet.balance)
    
                if (value > balance) throw new Error(MessageCustom.AMOUNT_GREATER_ON_BALANCE);
    
                const updateValue = (parseFloat(getWallet.balance) - formatCurrency)
                const updateBalance = await tx.wallet.update({
                    where: { userId: user.id },
                    data: { balance: updateValue }
                })
    
                if (!updateBalance) throw new Error(MessageCustomErrors.ERROR_UPDATE_BALANCE);
    
                transaction.statusTransaction = statusTransactionConstantEnum.SUCCESS
                this.dataCreateTransaction = { data: transaction }
                await tx.transaction.create(this.dataCreateTransaction)
    
                return { response: { message: MessageCustomSuccess.WITHDRAWAL_SUCCESSFULLY } }
            })

        } catch (error) {
            throw new Error(error);
        }
    }

    async getExtract(user: AuthLoginEntities): Promise<TransationEntities[]> {

        try {
            const findTransactions: TransationEntities[] = await this.connectionProvider.transaction.findMany({
                where: { userId: user.id },
                include: { product: true },
            })

            if (!findTransactions || findTransactions.length === 0) throw new Error(MessageCustom.WITHOUT_REGISTERS_EXTRACT);            

            for (const [key, item] of Object.entries(findTransactions)) {
                findTransactions[key].value = formatCurrencyPt(item.value)
                findTransactions[key].typeTransaction = typeTransactionEnum[(item.typeTransaction - 1)]['value']
                findTransactions[key].statusTransaction = statusTransactionEnum[(item.statusTransaction - 1)]['value']
            }

            return findTransactions

        } catch (error) {
            throw new Error(error);            
        }
    }

    async getBalance(user: AuthLoginEntities): Promise<WalletEntities> {
        try {
            return await this.connectionProvider.wallet.findUnique({
                where: { userId: user.id }
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }

}