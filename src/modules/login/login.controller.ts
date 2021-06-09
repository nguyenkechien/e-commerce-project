import { Controller, Get, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  @Render('login')
  async root() {
    return {
      title: 123,
    };
  }
}
