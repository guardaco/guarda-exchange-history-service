import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeys } from './config.keys';
import {
  ChangeNowApiOptions,
  ExchangeVendorsConfig,
  SwapzoneApiOptions,
} from './config.type';

@Injectable()
export class AppConfigService extends ConfigService {
  constructor(internalConfig: any) {
    super(internalConfig);
  }

  async getPostrgesOptions(): Promise<TypeOrmModuleOptions> {
    const postgresOptions = this.get<TypeOrmModuleOptions>(ConfigKeys.POSTGRES)!;

    if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASS) {
      throw new Error('[getPostrgesOptions] not found postgress params in env');
    }

    if(postgresOptions) {
      // @ts-ignore
      postgresOptions.username = process.env.POSTGRES_USER;
      // @ts-ignore
      postgresOptions.password = process.env.POSTGRES_PASS;

    }
    
    if (!postgresOptions) {
      throw new Error('[getPostrgesOptions] PostgreSQL options not found');
    }
    
    return postgresOptions;
  }

  getChangeNowApiOptions(): ChangeNowApiOptions {
    const options = this.get<ExchangeVendorsConfig>(
      ConfigKeys.EXCHANGE_VENDORS,
    );
    if (!options) {
      throw new Error('No change now configuration options found');
    }
    return options?.changenow;
  }
}
