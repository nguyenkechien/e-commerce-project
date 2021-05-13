import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, './', 'views'),
      }),
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
