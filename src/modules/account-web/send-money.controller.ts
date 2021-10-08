import { Controller, Get, Query, Inject } from '@nestjs/common';
import {
  SendMoneyUseCase,
  SendMoneyUseCaseSymbol,
} from 'src/domains/ports/in/send-money.use-case';
import { SendMoneyCommand } from 'src/domains/ports/in/send-money.command';
import { MoneyEntity } from 'src/domains/entities/money.entity';
import BigNumber from 'bignumber.js';

@Controller('/account/send')
export class SendMoneyController {
  constructor(
    @Inject(SendMoneyUseCaseSymbol)
    private readonly _sendMoneyUseCase: SendMoneyUseCase,
  ) {}
  @Get('/')
  async sendMoney(
    @Query('sourceAccountId') sourceAccountId: string,
    @Query('targetAccountId') targetAccountId: string,
    @Query('amount') amount: number,
  ) {
    const command = new SendMoneyCommand(
      sourceAccountId,
      targetAccountId,
      MoneyEntity.of(new BigNumber(amount)),
    );
    const result = await this._sendMoneyUseCase.sendMoney(command);
    return { result };
  }
}
