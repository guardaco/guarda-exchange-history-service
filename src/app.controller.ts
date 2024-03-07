import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeEntity } from './entities/exchange.entity';
import { AppService } from './app.service';
import { ExchangeError, ExchangeGetTransactionsDTO, ExchangeGetTransactionsRequestDTO } from './dto/exchange.dto';

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
}
