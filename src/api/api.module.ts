import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { RolesModule } from '@api/roles/roles.module';
import { UsersModule } from '@api/users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelperService } from '@utils/services/helper.services';
import { AllExceptionFilter } from '../utils/filters/api-exception.filter';

@Module({
  imports: [RolesModule, UsersModule, AuthModule],
  providers: [
    HelperService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [RolesModule, UsersModule, AuthModule],
})
export class ApiModule {}
