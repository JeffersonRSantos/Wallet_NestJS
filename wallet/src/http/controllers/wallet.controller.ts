import { Controller, Post, Req, Res, Get, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthLoginEntities } from 'src/application/entities/AuthLoginEntities';
import { WalletEntities } from 'src/application/entities/WalletEntities';
import { getExtractUseCase, getMoneyUseCase, setMoneyUseCase, getBalanceUseCase } from 'src/application/useCases/Wallet';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { formatCurrencyPt } from 'src/utils/formatCurrency';
import { messageCustom, messageCustomErrors } from 'src/utils/lang/common';
import { WalletDTO } from '../dtos/WalletDTO';
import { setMoneySchema } from '../schemas/SetMoneySchema';

@Controller('wallet')
export class WalletController {
  public setMoney = setMoneyUseCase
  public getMoney = getMoneyUseCase
  public getExtract = getExtractUseCase
  public getBalance = getBalanceUseCase

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('_add')
  async addMoney(@Res() resp: Response, @Req() req: Request, @Body() body: WalletDTO): Promise<Object> {

    const user: AuthLoginEntities = req.user;

    const validateSchema = await setMoneySchema(body)

    if (!validateSchema.success) {
      return resp.status(403).json({ error: validateSchema.error.issues[0].message });
    }

    const formatCurrency = parseFloat(body.value.replace(',', '.'));

    try {
      const set: any = await this.setMoney.execute({ value: formatCurrency, user })
      return resp.status(set?.status || 201).json(set)
    } catch (error) {
      throw new Error(messageCustomErrors.ERROR_CONTROLLER+" (/wallet/_add) "+error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('_withdraw')
  async withdrawMoney(@Res() resp: Response, @Req() req: Request, @Body() body: WalletDTO): Promise<Object> {

    const user: AuthLoginEntities = req.user;

    const validateSchema = await setMoneySchema(body)

    if (!validateSchema.success) {
      return resp.status(403).json({ error: validateSchema.error.issues[0].message });
    }

    const formatCurrency = parseFloat(body.value.replace(',', '.'));

    try {
      const set: any = await this.getMoney.execute({ value: formatCurrency, user })
      return resp.status(set?.status || 201).json(set)
    } catch (error) {
      throw new Error(messageCustomErrors.ERROR_CONTROLLER+" (/wallet/_withdraw) "+error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('_extract')
  async extract(@Res() resp: Response, @Req() req: Request): Promise<Object> {

    const userAuth: AuthLoginEntities = req.user

    try {
      const findExtract: any = await this.getExtract.execute(userAuth)
      
      return resp.status(findExtract?.status || 200).json(findExtract)
    } catch (error) {
      throw new Error(messageCustomErrors.ERROR_CONTROLLER+" (/wallet/_extract) "+error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('_balance')
  async balance(@Req() req: Request): Promise<Object> {

    const user: AuthLoginEntities = req.user

    try {
      const b: WalletEntities = await this.getBalance.execute(user)
      return {
        message: (b.balance > 0 ? messageCustom.BALANCE_AVAILABLE: messageCustom.BALANCE_UNAVAILABLE),
        balance: formatCurrencyPt(parseFloat(b.balance)),
        creditCardStatus: (b.active_credit_card ? messageCustom.CREDIT_CARD_ACTIVED : messageCustom.CREDIT_CARD_DESACTIVED)
      }
    } catch (error) {
      throw new Error(messageCustomErrors.ERROR_CONTROLLER+" (/wallet/_balance) "+error.message);

    }
  }
}
