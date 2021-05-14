import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
    return {
      title: 123,
    };
  }

  @Get('/login')
  @Render('login')
  login() {
    return {
      title: 123,
    };
  }
}
