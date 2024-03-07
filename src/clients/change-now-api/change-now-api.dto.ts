import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

export interface ChangeNowTransactionByIdDTO {
  id: string;
  status: string;
  actionsAvailable: string;
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  expectedAmountFrom: number;
  expectedAmountTo?: string;
  amountFrom: number;
  amountTo: number;
  payinAddress: string;
  payoutAddress: string;
  payinExtraId: string;
  payoutExtraId?: string;
  refundAddress: string;
  refundExtraId: string;
  createdAt: Date;
  updatedAt: Date;
  depositReceivedAt: Date;
  payinHash: string;
  payoutHash: string;
  fromLegacyTicker: string;
  toLegacyTicker: string;
}

export interface ChangeNowPayinDTO {
  currency: string;
  address: string;
  extraId: string;
  amount?: number;
  expectedAmount: number;
  hash: string;
}

export interface ChangeNowPayoutDTO {
  currency: string;
  address: string;
  extraId: string;
  amount?: number;
  expectedAmount: number;
  hash: string;
}

export interface ChangeNowRefundDTO {
  currency?: any;
  address?: any;
  extraId?: any;
  hash?: any;
}

export interface ChangeNowExchangeDTO {
  createdAt: Date;
  updatedAt: Date;
  exchangeId: string;
  requestId: string;
  status: string;
  validUntil?: any;
  flow: string;
  payin: ChangeNowPayinDTO;
  payout: ChangeNowPayoutDTO;
  refund: ChangeNowRefundDTO;
}

export interface ChangeNowExchangeListDTO {
  count: number;
  exchanges: ChangeNowExchangeDTO[];
}

export class ChangeNowTransactionByIdDTOClass {
  @IsString()
  id: string;

  @IsString()
  status: string;

  @IsString()
  actionsAvailable: string;

  @IsString()
  fromCurrency: string;

  @IsString()
  fromNetwork: string;

  @IsString()
  toCurrency: string;

  @IsString()
  toNetwork: string;

  @IsNumber()
  expectedAmountFrom: number;

  @IsString()
  expectedAmountTo?: string;

  @IsNumber()
  amountFrom: number;

  @IsNumber()
  amountTo: number;

  @IsString()
  payinAddress: string;

  @IsString()
  payoutAddress: string;

  @IsString()
  payinExtraId: string;

  @IsString()
  payoutExtraId?: string;

  @IsString()
  refundAddress: string;

  @IsString()
  refundExtraId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  depositReceivedAt: Date;

  @IsString()
  payinHash: string;

  @IsString()
  payoutHash: string;

  @IsString()
  fromLegacyTicker: string;

  @IsString()
  toLegacyTicker: string;
}

export class ChangeNowGetCurrenciesDTO {
  @IsString()
  ticker: string;

  @IsString()
  name: string;

  @IsUrl()
  image: URL;

  @IsBoolean()
  hasExternalId: boolean;

  @IsBoolean()
  isFiat: boolean;

  @IsBoolean()
  featured: boolean;

  @IsBoolean()
  isStable: boolean;

  @IsBoolean()
  supportsFixedRate: boolean;

  @IsString()
  network: string;

  @IsString()
  tokenContract?: string;

  @IsBoolean()
  buy: boolean;

  @IsBoolean()
  sell: boolean;

  @IsString()
  legacyTicker?: string;
}

export interface ChangeNowGetLimitsRequest {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  feeMode: 0 | 1;
}

export class ChangeNowGetLimitsDTO {
  @IsString()
  fromCurrency: string;

  @IsString()
  fromNetwork: string;

  @IsString()
  toCurrency: string;

  @IsString()
  toNetwork: string;

  @IsString()
  flow: string;

  @IsNumber()
  maxAmount: number | null;

  @IsNumber()
  minAmount: number | null;
}

export interface ChangeNowGetEstimateRequest {
  amount: string;
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  feeMode: 0 | 1;
}

export class ChangeNowGetEstimateDTO {
  @IsString()
  fromCurrency: string;

  @IsString()
  fromNetwork: string;

  @IsString()
  toCurrency: string;

  @IsString()
  toNetwork: string;

  @IsString()
  flow: string;

  @IsString()
  type: string;

  @IsString()
  rateId: string | null;

  @IsString()
  validUntil: string | null;

  @IsString()
  transactionSpeedForecast: string;

  @IsString()
  warningMessage: string | null;

  @IsNumber()
  depositFee: number;

  @IsNumber()
  withdrawalFee: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  fromAmount: number;

  @IsNumber()
  toAmount: number;
}

export class ChangeNowApiError {
  error: string | boolean;

  @IsString()
  message?: string;
}

export interface ChangeNowApiCreateTransactionRequest {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  fromAmount: string;
  address: string;
  addressFrom: string;
  refundAddress: string;
  feeMode: 0 | 1;
  userIP?: string;
}

export class ChangeNowCreateTransacionDTO {
  @IsString()
  id: string; // You can use it to get transaction status at the Transaction status API endpoint

  @IsString()
  fromCurrency: string; // Ticker of the currency you want to exchange

  @IsString()
  fromNetwork: string; // Network of the currency you want to exchange

  @IsString()
  toCurrency: string; // Ticker of the currency you want to receive

  @IsString()
  toNetwork: string; // Network of the currency you want to receive

  @IsNumber()
  fromAmount: number; // Amount of currency you want to exchange

  @IsNumber()
  toAmount: number; // Amount of currency you want to receive

  @IsString()
  flow: 'standard' | 'fixed-rate'; // Type of exchange flow

  @IsString()
  type: 'direct' | 'reverse'; // Use "direct" value to set amount for currencyFrom and get amount of currencyTo. Use "reverse" value to set amount for currencyTo and get amount of currencyFrom.

  @IsString()
  payoutAddress: string; // The wallet address that will recieve the exchanged funds

  @IsString()
  payinAddress: string; // CN generate it when creating a transaction

  @IsString()
  payoutExtraId: string; // Extra ID that you send when creating a transaction

  @IsString()
  payinExtraId: string; // CN generate it when creating a transaction

  @IsString()
  refundAddress: string; // Refund address (if you specified it)

  @IsString()
  refundExtraId: string; // Refund Extra ID (if you specified it)

  @IsString()
  payoutExtraIdName: string; // Field name currency Extra ID (e.g. Memo, Extra ID)

  @IsString()
  rateId: string; // (Required) Use rateId for fixed-rate flow. Set it to value that you got from previous method for estimated amount to freeze estimated amount.
}

export enum GetGethBalanceResponseCode {
  OK = 'OK',
  BAD_PARAMS = 'BAD_PARAMS',
  FORBIDDEN = 'FORBIDDEN',
}

class GetGethBalanceResult {
  currency: string;

  network: string;

  balance: string;
}

export class GetGethBalanceResponse {
  @IsOptional()
  @IsString()
  error: null | string;

  code: GetGethBalanceResponseCode;

  @IsOptional()
  result: null | GetGethBalanceResult;
}
