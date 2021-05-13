import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoresModule } from '@utils/index';
import { SchemaModule } from '@schema/schema.module';
import { ApiModule } from '@api/api.module';
import { ViewsModule } from './modules/index.module';
import { resolve } from 'path';
import { RenderModule } from 'nest-next';
import Next from 'next';

@Module({
  imports: [
    CoresModule,
    SchemaModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, '../', 'views'),
      }),
      { viewsDir: '' },
    ),
    ApiModule,
    ViewsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
