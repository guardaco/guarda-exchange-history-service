import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsString,
    IsEnum,
    IsOptional,
  } from 'class-validator';
  import { ExchangeEntity } from '../entities/exchange.entity';

export class ExchangeGetTransactionsRequestDTO {
    @IsString()
    @IsOptional()
    addresses?: [string, string];
  
    @IsString()
    @IsOptional()
    createdAtPeriod?: [number, number]; // from - to in ms for date format
  }

  export class ExchangeGetTransactionsDTO {
    @IsString()
    exchanges: ExchangeEntity[];
  }

  export class ExchangeError {
    @IsBoolean()
    error: boolean;
  
    @IsString()
    @IsOptional()
    message?: string;
  }  

  export class ExchangeTransactionByIdDTO {
    @IsString()
    id: string;
  
    @IsString()
    status: string;
  
    @IsString()
    fromCurrency: string;
  
    @IsString()
    fromNetwork: string;
  
    @IsString()
    toCurrency: string;
  
    @IsString()
    toNetwork: string;
  
    @IsString()
    amountFrom: string;
  
    @IsString()
    amountTo: string;
  
    @IsString()
    payinAddress: string;
  
    @IsString()
    payoutAddress: string;
  
    @IsString()
    payinExtraId: string;
  
    @IsString()
    @IsOptional()
    payoutExtraId?: string;
  
    @IsString()
    refundAddress: string;
  
    @IsString()
    refundExtraId: string;
  
    @IsString()
    payinHash: string;
  
    @IsString()
    payoutHash: string;
  
    @IsDate()
    depositReceivedAt: Date;
  
    @IsDate()
    createdAt: Date;
  
    @IsDate()
    updatedAt: Date;
  }
  