import { randomUUID } from "crypto";
import { TransationEntities } from "src/application/entities/TransactionEntities";
import { WalletEntities } from "src/application/entities/WalletEntities";
import { PrismaService } from "src/services/database/PrismaService";
import { statusTransactionConstantEnum, statusTransactionEnum, typeTransactionConstantEnum, typeTransactionEnum } from "src/utils/enums";
import { formatCurrencyPt } from "src/utils/formatCurrency";
import { messageCustom, messageCustomErrors, messageCustomSuccess } from "src/utils/lang/common";
import { IWallet } from "../interfaces/IWallet";

export class WalletProvider implements IWallet {
    constructor(
        private connectionProvider: PrismaService
    ) { }

    public dataCreateTransaction: any

    async setMoney(props: any): Promise<Object> {

        const uuidTransaction = randomUUID()

        let transaction: TransationEntities = {
            transactionId: uuidTransaction,
            value: parseFloat(props.value),
            userId: props.user.id,
            typeTransaction: typeTransactionConstantEnum.DEPOSIT
        }

        try {

            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.transaction.create(this.dataCreateTransaction)

            const getWallet: WalletEntities = await this.connectionProvider.wallet.findUnique({
                where: {
                    userId: props.user.id
                }
            })

            const updateValue = (parseFloat(getWallet.balance) + parseFloat(props.value))
            const updateBalance = await this.connectionProvider.wallet.update({
                where: { userId: props.user.id },
                data: {
                    balance: updateValue
                }
            })

            if (!updateBalance) return { status: 409, messsage: messageCustomErrors.ERROR_UPDATE_BALANCE }

            transaction.statusTransaction = statusTransactionConstantEnum.SUCCESS

            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.transaction.create(this.dataCreateTransaction)

            return { message: messageCustomSuccess.DEPOSIT_SUCCESSFULLY }
        } catch (error) {

            transaction.statusTransaction = statusTransactionConstantEnum.FAILED
            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.transaction.create(this.dataCreateTransaction)

            return { status: 500, error }
        }
    }

    async getMoney(props: any): Promise<Object> {

        const uuidTransaction = randomUUID()

        let transaction: TransationEntities = {
            transactionId: uuidTransaction,
            value: parseFloat(props.value),
            userId: props.user.id,
            typeTransaction: typeTransactionConstantEnum.WITHDRAW
        }

        try {

            const getWallet: WalletEntities = await this.connectionProvider.wallet.findUnique({
                where: {
                    userId: props.user.id
                }
            })

            const value = parseFloat(props.value)
            const balance = parseFloat(getWallet.balance)

            if (value > balance) return { status: 401, message: messageCustom.AMOUNT_GREATER_ON_BALANCE }

            const updateValue = (parseFloat(getWallet.balance) - parseFloat(props.value))
            const updateBalance = await this.connectionProvider.wallet.update({
                where: { userId: props.user.id },
                data: {
                    balance: updateValue
                }
            })

            if (!updateBalance) return { status: 409, messsage: messageCustomErrors.ERROR_UPDATE_BALANCE }

            transaction.statusTransaction = statusTransactionConstantEnum.SUCCESS
            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.transaction.create(this.dataCreateTransaction)

            return { status: 200, message: messageCustomSuccess.WITHDRAWAL_SUCCESSFULLY }

        } catch (error) {
            return { status: 500, error }
        }
    }

    async getExtract(props: any): Promise<Object> {

        try {
            const findTransactions = await this.connectionProvider.transaction.findMany({
                where: { userId: props.id }
            })

            if (!findTransactions || findTransactions.length === 0) return { message: messageCustom.WITHOUT_REGISTERS_EXTRACT }

            for (const [key, item] of Object.entries(findTransactions)) {
                findTransactions[key].value = formatCurrencyPt(item.value)
                findTransactions[key].typeTransaction = typeTransactionEnum[(item.typeTransaction - 1)]['value']
                findTransactions[key].statusTransaction = statusTransactionEnum[(item.statusTransaction - 1)]['value']
            }

            return { response: findTransactions }

        } catch (error) {
            return { status: 500, error }
        }
    }

    async getBalance(props: any): Promise<WalletEntities> {
        try {
            return await this.connectionProvider.wallet.findUnique({
                where: {
                    userId: props.id
                }
            })
        } catch (error) {
            throw new Error(error);

        }
    }

}