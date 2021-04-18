import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesService } from './api/roles/roles.service';
import { HelperService } from '@core/services/helper.services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rolesService: RolesService,
    private readonly helperService: HelperService,
  ) {}

  @Get()
  @Render('pages/index.tsx')
  async root(@Query() query: Record<string, any>) {
    const payload = await this.rolesService.findAll(query);

    return {
      message: this.appService.getHello(),
      payload: this.helperService.formatResult(payload),
    };
  }
  @Get('/login')
  @Render('pages/login.tsx')
  async login() {
    return { message: this.appService.getHello() };
  }
}
