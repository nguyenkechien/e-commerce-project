import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

interface GetHelloType {
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/index.tsx')
  root() {
    return { message: this.appService.getHello() };
  }
  @Get('/api/hello')
  getHello(): GetHelloType {
    return { message: this.appService.getHello() };
  }
}
