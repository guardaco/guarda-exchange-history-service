import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import appConfig from './configs/app.config';
import exchangeVendorConfig from './configs/exchange-vendor.config';
import postgresOrmConfig from './configs/postgres.orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [appConfig, exchangeVendorConfig, postgresOrmConfig],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {
  static forRoot(envUrl: string, isGlobal = false): DynamicModule {
    return {
      module: AppConfigModule,
      global: isGlobal,
      imports: [
        ConfigModule.forRoot({
          envFilePath: [envUrl],
        }),
      ],
      providers: [AppConfigService],
      exports: [AppConfigService],
    };
  }
}
