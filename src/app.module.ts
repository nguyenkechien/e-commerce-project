import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoresModule } from '@utils/index';
import { SchemaModule } from '@schema/schema.module';
import { ApiModule } from '@src/api/api.module';
import { ViewsModule } from './modules/view/view.module';
@Module({
  imports: [CoresModule, SchemaModule, ApiModule, ViewsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
