import { JwtService } from "@nestjs/jwt";
import { AuthLoginProvider } from "src/application/repositories/implementations/AuthLoginProvider";
import { PrismaService } from "src/services/database/PrismaService";
import { AuthLoginUseCase } from "./AuthLoginUseCase";

const ormProvider = new PrismaService()
const jwtService = new JwtService()

const authLoginProvider = new AuthLoginProvider(
    ormProvider,
    jwtService
)

const authLoginUseCase = new AuthLoginUseCase(
    authLoginProvider
)

export {authLoginUseCase}