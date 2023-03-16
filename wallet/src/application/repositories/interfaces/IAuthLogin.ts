import { AuthLoginEntities } from "src/application/entities/AuthLoginEntities";

export abstract class IAuthLogin{
    abstract login(props:Object): Promise<AuthLoginEntities>
}