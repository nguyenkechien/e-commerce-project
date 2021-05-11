import { Module } from '@nestjs/common';
import { HelperService } from '@utils/services/helper.services';
import { APP_FILTER } from '@nestjs/core';
import { ViewExceptionFilter } from '../utils/filters/exception.filter';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [HomeModule, LoginModule],
  providers: [
    HelperService,
    // {
    //   provide: APP_FILTER,
    //   useClass: ViewExceptionFilter,
    // },
  ],
  exports: [HomeModule, LoginModule],
})
export class ViewsModule {}
