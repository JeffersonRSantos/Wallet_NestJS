import { Injectable } from "@nestjs/common/decorators";
import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";
import { IShopping } from "src/application/repositories/interfaces/IShopping";

@Injectable()
export class CancellationUseCase{
    constructor(
        private cancellationProvider: IShopping
    ){}

    async execute(code_transaction: string, user: AuthLoginEntities){
        return await this.cancellationProvider.cancellation(code_transaction, user)
    }
}