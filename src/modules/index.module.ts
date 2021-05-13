import { Module } from '@nestjs/common';
// import { APP_FILTER } from '@nestjs/core';
// import { ViewExceptionFilter } from '@utils/filters/exception.filter';

import { HelperService } from '@utils/services/helper.services';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [HomeModule, LoginModule, MemberModule],
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
