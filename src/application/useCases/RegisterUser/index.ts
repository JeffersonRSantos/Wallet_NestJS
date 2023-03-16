import { RegisterUserProvider } from "src/application/repositories/implementations/RegisterUserProvider";
import { PrismaService } from "src/services/database/PrismaService";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

const ormProvider = new PrismaService()

const registerProvider = new RegisterUserProvider(
    ormProvider
)

const registerUserUseCase = new RegisterUserUseCase(
    registerProvider
)

export {registerUserUseCase}