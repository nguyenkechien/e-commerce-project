import {
  Controller,
  Get,
  Render,
  Query,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RolesController } from './api/roles/roles.controller';
import { HelperService } from '@core/services/helper.services';
import { ViewExceptionFilter } from './core/filters/exception.filter';
import { JwtAuthGuard } from './api/auth/guard/jwt-auth.guard';

@Controller()
@UseFilters(ViewExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rolesAPI: RolesController,
    private readonly helperService: HelperService,
  ) {}

  @Get()
  @Render('pages/index.tsx')
  @UseGuards(JwtAuthGuard)
  async root(@Query() query: Record<string, any>) {
    const payload = await this.rolesAPI.findAll(query);
    return payload;
  }
  @Get('/login')
  @Render('pages/login.tsx')
  async login() {
    return {};
  }
}
