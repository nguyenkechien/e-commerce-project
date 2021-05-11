import { Controller, Get, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  @Render('pages/login.tsx')
  async root() {
    return {};
  }
}
