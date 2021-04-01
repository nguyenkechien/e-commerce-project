import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger';
import { configuration } from '@helpers/configuration';
import { HelperService } from './services/helper.services';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception.filter';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [
    HelperService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [HelperService],
})
export class CoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
