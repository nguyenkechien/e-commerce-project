import { Module } from '@nestjs/common';
import { RolesModule } from '@api/roles/roles.module';
import { UsersModule } from '@api/users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RolesModule, UsersModule, AuthModule],
  exports: [RolesModule, UsersModule, AuthModule],
})
export class ApiModule {}
