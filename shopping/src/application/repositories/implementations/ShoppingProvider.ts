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
import { BuyProductDTO } from "src/http/dtos/BuyProductDTO";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { ResponseDTO } from "./dtos/ResponseDTO";

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

    async buyProduct(body: BuyProductDTO, user: AuthLoginEntities): Promise<ResponseDTO> {

        try {

            return await this.connectionProvider.$transaction(async (tx) => {

                const productInStock: ProductEntities = await tx.products.findFirst({
                    where: { code: body.code_product }
                })

                if (!productInStock) throw new Error(MessageCustomError.NOT_FOUND_PRODUCT);

                let price: any = productInStock.price

                const totalPriceAmount: any = parseFloat(price) * (body?.amount || 1)

                if (!(productInStock.stock >= body.amount)) throw new Error(MessageCustom.WITHOUT_STOCK);

                const getWallet = await tx.wallet.findUnique({
                    where: { userId: user.id },
                    select: { balance: true }
                })

                let balance: any = getWallet.balance

                if (!(parseFloat(balance) >= totalPriceAmount)) throw new Error(MessageCustom.INSUFFICIENT_BALANCE);

                let updateBalance: any = parseFloat(balance) - parseFloat(totalPriceAmount)

                const updateWallet = await tx.wallet.update({
                    where: { userId: user.id },
                    data: { balance: updateBalance }
                })

                const updateStock = (productInStock.stock - body.amount)
                productInStock.stock = updateStock

                await tx.products.update({
                    where: { id: productInStock.id },
                    data: { stock: updateStock }
                })

                const uuidTransaction: any = randomUUID()

                await tx.transaction.create({
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
                    response: {
                        message: MessageSuccess.SUCCESSFULLY_PURCHASE,
                        code: productInStock.code,
                        nameProduct: productInStock.name,
                        stock: updateStock,
                        price: formatCurrencyPt(parseFloat(productInStock.price))
                    }
                }

            })

        } catch (error) {
            throw new Error(error);
        }
    }

    async cancellation(code_transaction: string, user: AuthLoginEntities): Promise<TransationEntities> {

        const { id } = user

        try {

            return await this.connectionProvider.$transaction(async (tx) => {

                const existsTransaction: TransationEntities = await tx.transaction.findFirst({
                    where: { transactionId: code_transaction },
                    include: { product: { select: { name: true } } },
                    orderBy: { id: 'desc' },
                })

                if (!existsTransaction || existsTransaction.userId != id) throw new Error(MessageCustomError.NOT_FOUND_TRANSACTION);

                const validateHours = moment(existsTransaction.createdAt).add(process.env.TRANSACTION_EXPIRES_IN_MINUTES, 'm').toDate();

                if (statusTransactionConstantEnum.CANCELED == existsTransaction.statusTransaction) throw new Error(MessageCustom.TRANSACTION_ALREADY_CANCELED);

                if (moment(validateHours) < moment()) throw new Error(MessageCustom.TRANSACTION_EXPIRED_CANCELLATION);

                const getWallet = await tx.wallet.findUnique({ where: { userId: id } })

                const balance: any = getWallet.balance

                const updateBalance = parseFloat(balance) + parseFloat(existsTransaction.value)

                const updateWallet = await tx.wallet.update({
                    where: { userId: id }, data: { balance: updateBalance }
                })

                await tx.transaction.create({
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
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}