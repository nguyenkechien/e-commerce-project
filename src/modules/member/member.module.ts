import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MemberController],
  providers: [UsersModule],
})
export class MemberModule {}
