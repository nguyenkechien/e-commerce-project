import {
  Controller,
  Get,
  Render,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@api/auth/guard/jwt-auth.guard';
import { ViewExceptionFilter } from '@utils/filters/exception.filter';
import { UsersService } from '@api/users/users.service';
import { HelperService } from '@utils/services/helper.services';

@Controller('member')
@UseFilters(ViewExceptionFilter)
@UseGuards(JwtAuthGuard)
export class MemberController {
  constructor(
    private readonly usersService: UsersService,
    private readonly helperService: HelperService,
  ) {}

  @Get()
  @Render('pages/member.tsx')
  async root(@Request() req: any) {
    const user = await this.usersService.findOne(req?.user?.email);
    const payload = this.helperService.formatResult(user);
    return { user: payload };
  }
}
