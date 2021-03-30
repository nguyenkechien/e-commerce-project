import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoresModule } from '@core/index';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [CoresModule, SchemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
