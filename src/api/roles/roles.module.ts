import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SchemaModule } from '../../schema/schema.module';

@Module({
  imports: [SchemaModule],
  controllers: [RolesController],
  providers: [RolesService, RolesController],
  exports: [RolesService, RolesController],
})
export class RolesModule {}
