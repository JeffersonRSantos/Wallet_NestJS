import { Controller, Post, Req, Res, Get, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { TransationEntities } from 'src/application/entities/TransactionEntities';
import { ResponseDTO } from '../../../../src/application/repositories/implementations/dto/ResponseDTO';
import { AuthLoginEntities } from '../../../../src/application/entities/AuthLoginEntities';
import { WalletEntities } from '../../../../src/application/entities/WalletEntities';
import { JwtAuthGuard } from '../../../../src/core/guards/jwt-auth.guard';
import { formatCurrencyPt } from '../../../../src/utils/formatCurrency';
import { MessageCustom, MessageCustomErrors } from '../../../../src/utils/lang/common';
import { WalletDTO } from '../../../http/dtos/WalletDTO';
import { setMoneySchema } from '../../../http/schemas/SetMoneySchema';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { GetExtractUseCase } from './GetExtractUseCase';
import { GetMoneyUseCase } from './GetMoneyUseCase';
import { SetMoneyUseCase } from './SetMoneyUseCase';

@Controller('wallet')
export class WalletController {
  constructor(
    private setMoneyUseCase: SetMoneyUseCase,
    private getMoneyUseCase: GetMoneyUseCase,
    private getExtractUseCase: GetExtractUseCase,
    private getBalanceUseCase: GetBalanceUseCase
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('_add')
  async addMoney(@Res() resp: Response, @Req() req: Request, @Body() body: WalletDTO): Promise<Response> {

    const user: AuthLoginEntities = req.user;

    const validateSchema = await setMoneySchema(body)

    if (!validateSchema.success) {
      return resp.status(403).json({ error: validateSchema.error.issues[0].message });
    }

    try {
      const set: ResponseDTO = await this.setMoneyUseCase.execute(body.value, user)
      return resp.status(201).json(set)
    } catch (error) {
      return resp.status(500).json({
        module: MessageCustomErrors.ERROR_CONTROLLER + " (/wallet/_add) ",
        errorMessage: error.message
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('_withdraw')
  async withdrawMoney(@Res() resp: Response, @Req() req: Request, @Body() body: WalletDTO): Promise<Response> {

    const user: AuthLoginEntities = req.user;

    const validateSchema = await setMoneySchema(body)

    if (!validateSchema.success) {
      return resp.status(403).json({ error: validateSchema.error.issues[0].message });
    }

    try {
      const set: ResponseDTO = await this.getMoneyUseCase.execute(body.value, user)
      return resp.status(200).json(set)
    } catch (error) {
      return resp.status(500).json({
        module: MessageCustomErrors.ERROR_CONTROLLER + " (/wallet/_withdraw) ",
        errorMessage: error.message
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('_extract')
  async extract(@Req() req: Request): Promise<ResponseDTO> {

    const userAuth: AuthLoginEntities = req.user

    try {
      const result = await this.getExtractUseCase.execute(userAuth)
      return {response: result}
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('_balance')
  async balance(@Req() req: Request): Promise<ResponseDTO> {

    const user: AuthLoginEntities = req.user

    try {
      const b: WalletEntities = await this.getBalanceUseCase.execute(user)
      return {
        response: {
          message: (b.balance > 0 ? MessageCustom.BALANCE_AVAILABLE : MessageCustom.BALANCE_UNAVAILABLE),
          balance: formatCurrencyPt(parseFloat(b.balance)),
          creditCardStatus: (b.active_credit_card ? MessageCustom.CREDIT_CARD_ACTIVED : MessageCustom.CREDIT_CARD_DESACTIVED)
        }
      }
    } catch (error) {
      throw new Error(MessageCustomErrors.ERROR_CONTROLLER + " (/wallet/_balance) " + error.message);
    }
  }
}
