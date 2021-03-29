import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoresModule } from '@core/index';

@Module({
  imports: [CoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
