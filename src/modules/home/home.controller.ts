import {
  Controller,
  Get,
  Query,
  Render,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { RolesService } from '@api/roles/roles.service';
import { HelperService } from '@utils/services/helper.services';
import { JwtAuthGuard } from '@api/auth/guard/jwt-auth.guard';
import { ViewExceptionFilter } from '@utils/filters/exception.filter';

@Controller('')
@UseFilters(ViewExceptionFilter)
@UseGuards(JwtAuthGuard)
export class HomeController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly helperService: HelperService,
  ) {}
  @Get()
  @Render('index')
  async root(@Query() query: Record<string, any>) {
    const payload = await this.rolesService.findAll(query);
    const result = this.helperService.formatResult(payload);
    return result;
  }
}
