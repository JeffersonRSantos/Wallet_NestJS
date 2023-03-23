import { AuthLoginDTO } from "src/http/dtos/AuthLoginDTO";
import { ResponseDTO } from "../implementations/dto/ResponseDTO";

export abstract class IAuthLogin{
    abstract login(props: AuthLoginDTO): Promise<ResponseDTO>
}