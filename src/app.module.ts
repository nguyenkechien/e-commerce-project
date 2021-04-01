import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoresModule } from '@core/index';
import { SchemaModule } from './schema/schema.module';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [CoresModule, SchemaModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
