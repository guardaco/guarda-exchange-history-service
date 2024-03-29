import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeEntity } from './entities/exchange.entity';
import { AppService } from './app.service';
import { ExchangeError, ExchangeGetTransactionsDTO, ExchangeGetTransactionsRequestDTO, ExchangeTransactionByIdDTO, ExchangeUpdateTransactionDTO, ExchangeUpdateTransactionRequestDTO, GetTransactionByIdRequestDTO } from './dto/exchange.dto';

@Controller('exchange/v1/api/')
export class AppController {
  constructor(
    private readonly exchangeService: AppService,
  ) {}

  @Get('/health-check')
  async healthCheck(): Promise<string> {
    return 'OK';
  }

  @Get('/get-transaction/:partner/:id')
  async getTransactionById(
    @Param('id') id: GetTransactionByIdRequestDTO['id'],
    @Param('partner') partner: GetTransactionByIdRequestDTO['partner'],
  ): Promise<{
    transaction: ExchangeTransactionByIdDTO | ExchangeError;
  }> {
    return this.exchangeService.getTransactionById({ id, partner });
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
