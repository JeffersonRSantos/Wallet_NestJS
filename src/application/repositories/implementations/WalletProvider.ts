import { randomUUID } from "crypto";
import { TransationEntities } from "src/application/entities/TransactionEntities";
import { WalletEntities } from "src/application/entities/WalletEntities";
import { PrismaService } from "src/services/database/PrismaService";
import { statusTransactionConstantEnum, statusTransactionEnum, typeTransactionConstantEnum, typeTransactionEnum } from "src/utils/enums";
import { formatCurrencyPt } from "src/utils/formatCurrency";
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
            await this.connectionProvider.tb_transaction.create(this.dataCreateTransaction)

            const getWallet: WalletEntities = await this.connectionProvider.tb_wallet.findUnique({
                where: {
                    userId: props.user.id
                }
            })

            if (!getWallet) {
                const create: WalletEntities = await this.connectionProvider.tb_wallet.create({
                    data: {
                        userId: props.user.id,
                        balance: props.value
                    }
                })

                if (!create) return { status: 409, messsage: "Erro to create wallet." }

            } else {
                const updateValue = (parseFloat(getWallet.balance) + parseFloat(props.value))
                const updateBalance = await this.connectionProvider.tb_wallet.update({
                    where: { userId: props.user.id },
                    data: {
                        balance: updateValue
                    }
                })

                if (!updateBalance) return { status: 409, messsage: "Erro to update balance on wallet." }
            }

            transaction.statusTransaction = statusTransactionConstantEnum.SUCCESS

            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.tb_transaction.create(this.dataCreateTransaction)

            return { message: "Deposit made successfully." }
        } catch (error) {

            transaction.statusTransaction = statusTransactionConstantEnum.FAILED
            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.tb_transaction.create(this.dataCreateTransaction)

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

            const getWallet: WalletEntities = await this.connectionProvider.tb_wallet.findUnique({
                where: {
                    userId: props.user.id
                }
            })

            if (!getWallet) return { status: 200, messsage: "Ops... You have no balance." }

            const value = parseFloat(props.value)
            const balance = parseFloat(getWallet.balance)

            if (value > balance) return { status: 401, message: 'Amount greater than the balance.' }

            const updateValue = (parseFloat(getWallet.balance) - parseFloat(props.value))
            const updateBalance = await this.connectionProvider.tb_wallet.update({
                where: { userId: props.user.id },
                data: {
                    balance: updateValue
                }
            })

            if (!updateBalance) return { status: 409, messsage: "Erro to update balance on wallet." }

            transaction.statusTransaction = statusTransactionConstantEnum.SUCCESS
            this.dataCreateTransaction = { data: transaction }
            await this.connectionProvider.tb_transaction.create(this.dataCreateTransaction)

            return { status: 200, message: "Withdraw made successfully." }

        } catch (error) {
            return { status: 500, error }
        }
    }

    async getExtract(props: any): Promise<Object> {

        try {
            const findTransactions = await this.connectionProvider.tb_transaction.findMany({
                where: { userId: props.id }
            })

            if (!findTransactions) return { message: 'Not Found Extract.' }

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
            return await this.connectionProvider.tb_wallet.findUnique({
                where: {
                    userId: props.id
                }
            })
        } catch (error) {
            throw new Error(error);

        }
    }

}