import { PrismaService } from "src/services/database/PrismaService";

export abstract class IRegisterUser{
    abstract create(props: Object) : Promise<void>
}