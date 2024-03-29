import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './modules/config/config.service';
import { ExchangeEntity } from './entities/exchange.entity';
import { AppLoggerMiddleware } from './middleware/app-logger.middleware';
import { ChangeNowApiModule } from './clients/change-now-api/change-now-api.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => {
        const config = await configService.getPostrgesOptions();
        // @ts-ignore
        config.entities = [ExchangeEntity];
        return config;
      },}),
    TypeOrmModule.forFeature([ExchangeEntity]),
    ChangeNowApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('/');
  }
}
