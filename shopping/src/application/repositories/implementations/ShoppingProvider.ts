import { randomUUID } from "crypto";
import { Injectable } from '@nestjs/common'
import * as moment from "moment";
import * as dotnenv from "dotenv";
import { ProductEntities } from "src/application/entities/ProductEntities";
import { TransationEntities } from "src/application/entities/TransactionEntities";
import { PrismaService } from "src/services/database/PrismaService";
import { statusTransactionConstantEnum, typeTransactionConstantEnum } from "src/utils/enums";
import { formatCurrencyPt } from "src/utils/formatCurrency";
import { IShopping } from "../interfaces/IShopping";
import { MessageCustom, MessageCustomError, MessageSuccess } from "src/utils/lang/common";

@Injectable()
export class ShoppingProvider implements IShopping {
    constructor(
        private connectionProvider: PrismaService
    ) { }

    async getListProducts(): Promise<ProductEntities[]> {
        try {
            const products: any = await this.connectionProvider.products.findMany({
                select: {
                    code: true,
                    name: true,
                    description: true,
                    stock: true,
                    price: true
                }
            })

            return products
        } catch (error) {
            throw new Error(error);
        }
    }

    async buyProduct(props: any): Promise<Object> {

        const { user, body } = props

        try {
            const productInStock: ProductEntities = await this.connectionProvider.products.findFirst({
                where: { code: body.code_product }
            })

            if(!productInStock) return

            let price: any = productInStock.price

            const totalPriceAmount: any = parseFloat(price) * (body?.amount || 1)

            if (!(productInStock.stock >= body.amount)) return { message: MessageCustom.WITHOUT_STOCK }

            const getWallet = await this.connectionProvider.wallet.findUnique({
                where: { userId: user.id },
                select: { balance: true }
            })

            let balance: any = getWallet.balance

            if (!(parseFloat(balance) >= totalPriceAmount)) return { message: MessageCustom.INSUFFICIENT_BALANCE }

            let updateBalance: any = parseFloat(balance) - parseFloat(totalPriceAmount)

            const updateWallet = await this.connectionProvider.wallet.update({
                where: { userId: user.id },
                data: {
                    balance: updateBalance
                }
            })

            const updateStock = (productInStock.stock - body.amount)
            productInStock.stock = updateStock

            await this.connectionProvider.products.update({
                where: { id: productInStock.id },
                data: { stock: updateStock }
            })

            const uuidTransaction: any = randomUUID()

            await this.connectionProvider.transaction.create({
                data: {
                    transactionId: uuidTransaction,
                    value: parseFloat(totalPriceAmount),
                    userId: user.id,
                    typeTransaction: typeTransactionConstantEnum.BUY,
                    productId: productInStock.id,
                    statusTransaction: (updateWallet ? statusTransactionConstantEnum.SUCCESS : statusTransactionConstantEnum.FAILED)
                }
            })

            return {
                message: MessageSuccess.SUCCESSFULLY_PURCHASE,
                code: "clfcmvx4c0002gt3wpyrr5fvx",
                nameProduct: "Recarga 50",
                stock: 28,
                price: formatCurrencyPt(parseFloat(productInStock.price))
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    async cancellation(props: any): Promise<Object> {

        const { id } = props.user

        try {
            const existsTransaction: TransationEntities = await this.connectionProvider.transaction.findFirst({
                where: { transactionId: props.code_transaction },
                include: {
                    product: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {  id: 'desc' },
            })

            if (!existsTransaction || existsTransaction.userId != id) return { status: 200, message: MessageCustomError.NOT_FOUND_TRANSACTION };

            const validateHours = moment(existsTransaction.createdAt).add(process.env.TRANSACTION_EXPIRES_IN_MINUTES, 'm').toDate();            
            
            if (statusTransactionConstantEnum.CANCELED == existsTransaction.statusTransaction) return { status: 200, message: MessageCustom.TRANSACTION_ALREADY_CANCELED }
            
            if (moment(validateHours) < moment()) return { status: 200, message: MessageCustom.TRANSACTION_EXPIRED_CANCELLATION }

            const getWallet = await this.connectionProvider.wallet.findUnique({ where: { userId: id } })

            const balance: any = getWallet.balance

            const updateBalance = parseFloat(balance) + parseFloat(existsTransaction.value)

            const updateWallet = await this.connectionProvider.wallet.update({
                where: { userId: id }, data: { balance: updateBalance }
            })

            await this.connectionProvider.transaction.create({
                data: {
                    transactionId: existsTransaction.transactionId,
                    value: existsTransaction.value,
                    userId: existsTransaction.userId,
                    typeTransaction: existsTransaction.typeTransaction,
                    productId: (existsTransaction.productId ?? null),
                    statusTransaction: (updateWallet ? statusTransactionConstantEnum.CANCELED : statusTransactionConstantEnum.FAILED)
                }
            })

            return existsTransaction
        } catch (error) {
            throw new Error(error);
        }
    }
}