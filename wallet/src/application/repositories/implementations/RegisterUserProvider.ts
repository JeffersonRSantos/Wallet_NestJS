import { PrismaService } from "../../../../src/services/database/PrismaService";
import { IRegisterUser } from "../interfaces/IRegisterUser";
import * as bcrypt from 'bcrypt';
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { RegisterUserDTO } from "src/http/dtos/RegisterUserDTO";

@Injectable()
export class RegisterUserProvider implements IRegisterUser {
    constructor(
        private connectionProvider: PrismaService
    ) { }

    async create(props: RegisterUserDTO): Promise<any> {
        props.password = bcrypt.hashSync(props.password, 10);
        return await this.connectionProvider.$transaction(async (tx) => {
            try {
                const user = await tx.user.create({ data: props })
                await tx.wallet.create({
                    data: { userId: user.id, balance: 0.00 }
                })
                return user
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {                      
                        throw new Error(`Field: (${e.meta.target}) - already exists`);
                    }
                }
                throw new Error(e);
                
            }
        })

    }
}