import { Module } from '@nestjs/common';
import { RolesModule } from '@api/roles/roles.module';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [RolesModule, UsersModule],
  exports: [RolesModule, UsersModule],
})
export class ApiModule {}
