import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  ChangeNowApiError,
  ChangeNowTransactionByIdDTO,
} from './change-now-api.dto';
import { AppConfigService } from '../../modules/config/config.service';

@Injectable()
export class ChangeNowApiService {
  private readonly logger = new Logger(ChangeNowApiService.name);

  private readonly apiCommon: AxiosInstance;

  private readonly apiLowFee: AxiosInstance;

  constructor(private readonly config: AppConfigService) {
    const options = config.getChangeNowApiOptions();
    this.apiCommon = axios.create({
      baseURL: options.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-changenow-api-key': options.apiKey,
      },
    });

    this.apiLowFee = axios.create({
      baseURL: options.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-changenow-api-key': options.apiKeyLowFee,
      },
    });
  }

  async getApi(lowFee: 1 | 0): Promise<AxiosInstance> {
    if (lowFee) {
      return this.apiLowFee;
    }
    return this.apiCommon;
  }

  public async getExchangeById(
    id: string,
  ): Promise<ChangeNowTransactionByIdDTO | ChangeNowApiError> {
    try {
      const { data } = await this.apiCommon.get<ChangeNowTransactionByIdDTO>(
        `/exchange/by-id?id=${id}`,
      );
      return data;
    } catch (err: any) {
      this.logger.error(err.message);

      return {
        error: true,
        message: err.message,
      };
    }
  }

}
