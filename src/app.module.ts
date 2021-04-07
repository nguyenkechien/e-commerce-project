import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoresModule } from '@core/index';
import { SchemaModule } from './schema/schema.module';
import { ApiModule } from '@api/api.module';
@Module({
  imports: [CoresModule, SchemaModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
