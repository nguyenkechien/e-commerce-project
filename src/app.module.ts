import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoresModule } from '@utils/index';
import { SchemaModule } from '@schema/schema.module';
import { ApiModule } from '@api/api.module';
import { ViewsModule } from './modules/index.module';
@Module({
  imports: [CoresModule, SchemaModule, ApiModule, ViewsModule],
  controllers: [AppController],
})
export class AppModule {}
