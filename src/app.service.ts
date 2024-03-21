import { Injectable, Logger } from '@nestjs/common';
import { ExchangeEntity } from './entities/exchange.entity';
import { ExchangeError, ExchangeGetTransactionsRequestDTO, ExchangeTransactionByIdDTO, ExchangeUpdateTransactionRequestDTO,  ExchangeUpdateTransactionDTO} from './dto/exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { ChangeNowApiError, ChangeNowTransactionByIdDTOClass } from './clients/change-now-api/change-now-api.dto';
import { ChangeNowApiService } from './clients/change-now-api/change-now-api.service';
import { CHANGENOW_PARTNER, MONITORING_WALLETS } from './consts';
import { finished } from 'stream';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly changeNowApiService: ChangeNowApiService,
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepo: Repository<ExchangeEntity>,
  ) {}

  async getTransactions({
    addresses,
    createdAtPeriod,
  }: ExchangeGetTransactionsRequestDTO): Promise<{
    exchanges: ExchangeEntity[];
  }> {

    if (createdAtPeriod) {
      // specified if request is from board
      const exchanges = await this.exchangeRepo.find({
        where: {
          createdAt: Between(new Date(createdAtPeriod[0]), new Date(createdAtPeriod[1])),
        },
      });      return {
        exchanges,
      };
    }

    console.log(1)

    if (!addresses?.length) {
      // const exchangeTransactions = await this.exchangeRepo.find();
      // return {
      //   exchanges: exchangeTransactions,
      // };
      console.log(2)

      return {
        exchanges: []
      }
    }

    console.log(3)

    let exchanges: ExchangeEntity[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const wallet of addresses) {

      console.log(4)
      console.log(wallet)

      // if wallet from monitring => skip
      if (this.isExcluded(wallet[0], wallet[1])) {
        console.log(3245234)
        console.log('Excluded wallet:', wallet[1]);

        continue; 
      }

      try {
        const resultFrom = await this.exchangeRepo.find({
          where: {
            fromAddress: wallet[1],
            fromCurrency: wallet[0],
            status: In(['finished', 'refund', 'expired', 'failed', 'waiting']),
          },
        });
        console.log('-----------------------------FROM-----------------------------')
        console.log(resultFrom)
        console.log('---------------------------------------------------------------')

        exchanges = exchanges.concat(resultFrom || []);
      } catch (ignore) {
        console.error('error', ignore);
      }

      try {
        const resultTo = await this.exchangeRepo.find({
          where: {
            payoutAddress: wallet[1],
            toCurrency: wallet[0],
            status: In(['finished', 'refund', 'expired', 'failed', 'waiting']),
          }
        });
        console.log('-----------------------------TO--------------------------------')
        console.log(resultTo)
        console.log('---------------------------------------------------------------')

        exchanges = exchanges.concat(resultTo || []);
      } catch (ignore) {
        console.error('error', ignore);
      }
    }

    const accessKeys = [
      'exchangeId',
      'status',
      'hash',
      'payinHash',
      'payoutHash',
      'fromAddress',
      'payinAddress',
      'payoutAddress',
      'payinExtraId',
      'payoutExtraId',
      'fromCurrency',
      'toCurrency',
      'amountSend',
      'amountReceive',
      'networkFee',
      'amountTo',
    ];

    console.log(5)

    for (const exchange of exchanges) {
      console.log(6)
      console.log(exchange)
      // eslint-disable-line
      const isNeedUpdateByDate =
        exchange.updatedAt === undefined ||
        Number(new Date(exchange.createdAt || Date.now())) >
          Date.now() - 1000 * 60 * 60 * 24 * 7;

        console.log(7)
        console.log(isNeedUpdateByDate)  
        console.log(8)



      if (
        exchange &&
        ['finished', 'failed', 'refunded', 'expired'].indexOf(
          exchange.status,
        ) === -1 &&
        isNeedUpdateByDate
      ) {
        try {
          console.log(9)

          const { transaction: tx } = await this.getTransactionById({
            id: exchange.exchangeId,
            partner: CHANGENOW_PARTNER,
          });
          let needUpdate = false;

          Object.keys(tx).forEach((key) => {
            if (accessKeys.indexOf(key) > -1) {
              // @ts-ignore
              if (tx[key] && key === 'status' && tx[key] !== exchange[key]) {
                // update status
                // @ts-ignore
                exchange[key] = tx[key];
                needUpdate = true;
              }
              // @ts-ignore
              if (key !== 'amountTo' && !exchange[key] && tx[key]) {
                // update fields if field null
                // @ts-ignore
                exchange[key] = tx[key];
                needUpdate = true;
              }
              // @ts-ignore
              if (
                tx[key] &&
                exchange[key] &&
                String(tx[key]) !== String(exchange[key])
              ) {
                // @ts-ignore
                exchange[key] = tx[key];
                needUpdate = true;
              }
            }
          });

          if (needUpdate) {
            await this.exchangeRepo.save(exchange);
          }
        } catch (e) {
          console.error('Failed update exchange transaction ', e);
        }
      }
    }

    const results: ExchangeEntity[] = [];
    const ids: string[] = [];

    exchanges.forEach((exchange) => {
      const exchangeId = exchange.id;
      if (!ids.includes(exchangeId)) {
        if (!exchange.updatedAt && exchange.createdAt) {
          exchange.updatedAt = exchange.createdAt;
        }
        results.push(exchange);
        ids.push(exchangeId);
      }
    });

    return {
      exchanges: results,
    };
  }

  async getTransactionById({
    id,
    partner,
  }: {
    id: string;
    partner: 'changenow';
  }): Promise<{ transaction: ExchangeTransactionByIdDTO | ExchangeError }> {
    let rawTransaction;
    if (partner === 'changenow') {
      rawTransaction = await this.changeNowApiService.getExchangeById(id);
    }
     else {
      this.logger.error(`${partner} is not supported`);
      return {
        transaction: {
          error: true,
          message: `${partner} is not supported`,
        },
      };
    }
    const transaction = AppService.transactionMapper(rawTransaction);
    return { transaction };
  }

  private static transactionMapper(
    transaction:
      | ChangeNowTransactionByIdDTOClass
      | ChangeNowApiError
  ): ExchangeTransactionByIdDTO | ExchangeError {
    if ('error' in transaction) {
      console.error(`[AppService]: ${transaction.message || 'some error'}`);
      return {
        error: true,
        message: transaction.message || 'some error',
      };
    }
    return {
      id: transaction.id,
      status: transaction.status,
      fromCurrency: transaction.fromCurrency,
      fromNetwork: transaction.fromNetwork,
      toCurrency: transaction.toCurrency,
      toNetwork: transaction.toNetwork,
      amountFrom: transaction.amountFrom?.toString(),
      amountTo: transaction.amountTo?.toString(),
      payinAddress: transaction.payinAddress,
      payoutAddress: transaction.payoutAddress,
      payinExtraId: transaction.payinExtraId,
      payoutExtraId: transaction.payoutExtraId,
      payinHash: transaction.payinHash,
      payoutHash: transaction.payoutHash,
      refundAddress: transaction.refundAddress,
      refundExtraId: transaction.refundExtraId,
      depositReceivedAt: transaction.depositReceivedAt,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  async updateTransaction({
    exchangeId,
    payinHash,
    amountTo,
    fromFamily,
    toFamily,
    dustInvoiceId,
  }: ExchangeUpdateTransactionRequestDTO): Promise<
    ExchangeUpdateTransactionDTO | ExchangeError
  > {
    // @ts-ignore
    const exchangeTransaction = await this.exchangeRepo.findOne({ exchangeId });

    if (!exchangeTransaction) {
      return {
        status: false,
      };
    }

    if (payinHash) {
      Object.assign(exchangeTransaction, {
        payinHash,
        status: finished,
      });
    }

    if (amountTo) {
      Object.assign(exchangeTransaction, {
        amountReceive: amountTo,
      });
    }

    if (dustInvoiceId) {
      Object.assign(exchangeTransaction, {
        dustInvoiceId,
      });
    }

    if (fromFamily) {
      Object.assign(exchangeTransaction, {
        fromFamily,
      });
    }

    if (toFamily) {
      Object.assign(exchangeTransaction, {
        toFamily,
      });
    }

    await this.exchangeRepo.save(exchangeTransaction);

    return {
      status: true,
    };
  }

  private async isExcluded (currency: string, address: string) {
    return MONITORING_WALLETS.some(exclusion => exclusion.currency === currency && exclusion.address.toLowerCase() === address.toLowerCase());
  }

}
