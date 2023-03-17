import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { IAuthLogin } from "../interfaces/IAuthLogin";
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "src/services/database/PrismaService";
import * as bcrypt from 'bcrypt';
import * as process from 'process'
import { WalletEntities } from "src/application/entities/WalletEntities";
import { messageCustomErrors } from "src/utils/lang/common";

export class AuthLoginProvider implements IAuthLogin {
    constructor(
        private connectionProvider: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(props: any): Promise<any> {
        try {
            const user: AuthLoginEntities = await this.connectionProvider.user.findUnique({
                where: { email: props.email },
            })
            
            if (!user) return { status: 401, message: messageCustomErrors.LOGIN_INVALID }
            else {
                const walletUser: WalletEntities = await this.connectionProvider.wallet.findUnique({
                    where: {userId: user.id},
                    select: {
                        balance: true,
                        active_credit_card: true
                    }
                })

                const verifyPass = await bcrypt.compare(props.password, user.password)

                if(!verifyPass) return {status: 401, message: messageCustomErrors.LOGIN_INVALID}

                const token = this.jwtService.sign({ id: user.id, email: user.email, wallet: walletUser },{
                    secret: process.env.SECRET_KEY,
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                return { bearer_token: token, expires_in: '1 day' }
            }
        } catch (error) {
            return {status: 500, error}
        }
    }
}