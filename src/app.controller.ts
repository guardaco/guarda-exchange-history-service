import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeEntity } from './entities/exchange.entity';
import { AppService } from './app.service';
import { ExchangeError, ExchangeGetTransactionsDTO, ExchangeGetTransactionsRequestDTO, ExchangeUpdateTransactionDTO, ExchangeUpdateTransactionRequestDTO } from './dto/exchange.dto';

@Controller()
export class AppController {
  constructor(
    private readonly exchangeService: AppService,
    @InjectRepository(ExchangeEntity)
    private exchangeRepo: Repository<ExchangeEntity>,
  ) {}

  @Get('/health-check')
  async healthCheck(): Promise<string> {
    return 'OK';
  }

  @Post('/get-transactions')
  async getTransactions(
    @Body('addresses')
    addresses: ExchangeGetTransactionsRequestDTO['addresses'],
    @Body('createdAtPeriod')
    createdAtPeriod: ExchangeGetTransactionsRequestDTO['createdAtPeriod'],
  ): Promise<ExchangeGetTransactionsDTO | ExchangeError> {
    return this.exchangeService.getTransactions({
      addresses,
      createdAtPeriod,
    });
  }

  @Put('/update-transaction')
  async updateTransaction(
    @Body('exchangeId')
    exchangeId: ExchangeUpdateTransactionRequestDTO['exchangeId'],
    @Body('payinHash')
    payinHash: ExchangeUpdateTransactionRequestDTO['payinHash'],
    @Body('amountTo') amountTo: ExchangeUpdateTransactionRequestDTO['amountTo'],
    @Body('fromFamily')
    fromFamily: ExchangeUpdateTransactionRequestDTO['fromFamily'],
    @Body('toFamily') toFamily: ExchangeUpdateTransactionRequestDTO['toFamily'],
  ): Promise<ExchangeUpdateTransactionDTO | ExchangeError> {
    return this.exchangeService.updateTransaction({
      exchangeId,
      payinHash,
      amountTo,
      fromFamily,
      toFamily,
    });
  }
}
