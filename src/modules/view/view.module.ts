import { Module } from '@nestjs/common';
import { HelperService } from '@utils/services/helper.services';
import { HomeModule } from '../home/home.module';
import { LoginModule } from '../login/login.module';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, '../../client'),
      }),
      {
        viewsDir: '',
      },
    ),
    HomeModule,
    LoginModule,
  ],
  providers: [HelperService],
  exports: [HomeModule, LoginModule],
})
export class ViewsModule {}
