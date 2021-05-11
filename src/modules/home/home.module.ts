import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { RolesModule } from '@api/roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [HomeController],
  providers: [RolesModule],
})
export class HomeModule {}
