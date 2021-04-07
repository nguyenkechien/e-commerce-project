import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SchemaModule } from '@schema/schema.module';
import { RolesModule } from '@api/roles/roles.module';
@Module({
  imports: [SchemaModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
