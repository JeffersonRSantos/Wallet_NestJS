import { Injectable } from "@nestjs/common/decorators";
import { ShoppingProvider } from "src/application/repositories/implementations/ShoppingProvider";

@Injectable()
export class CancellationUseCase{
    constructor(
        private cancellationProvider: ShoppingProvider
    ){}

    async execute(props: Object){
        return await this.cancellationProvider.cancellation(props)
    }
}