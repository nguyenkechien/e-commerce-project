import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';

@Module({
  controllers: [],
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, './', 'views'),
      }),
    ),
  ],
})
export class AppModule {}
