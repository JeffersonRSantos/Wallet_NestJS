import { PrismaService } from "../../../../src/services/database/PrismaService";
import { IRegisterUser } from "../interfaces/IRegisterUser";
import * as bcrypt from 'bcrypt';
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RegisterUserProvider implements IRegisterUser {
    constructor(
        private connectionProvider: PrismaService
    ) { }

    async create(props: any): Promise<any> {
        try {
            props.data.password = bcrypt.hashSync(props.data.password, 10);
            const user = await this.connectionProvider.user.create(props)
            await this.connectionProvider.wallet.create({
                data: {
                    userId: user.id,
                    balance: 0.00
                }
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return {status: 409, message: `Field: (${e.meta.target}) - already exists`}
                }
            }
            return e
            
        }
    }
}