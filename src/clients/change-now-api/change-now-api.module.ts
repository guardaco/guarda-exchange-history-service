import { Module } from '@nestjs/common';
import { ChangeNowApiService } from './change-now-api.service';
import { AppConfigModule } from '../../modules/config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [ChangeNowApiService],
  exports: [ChangeNowApiService],
})
export class ChangeNowApiModule {}
