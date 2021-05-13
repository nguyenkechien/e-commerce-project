import { Controller, Get, Render, Res } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';

@Controller()
export class AppController {
  @Get()
  index(@Res() res: RenderableResponse) {
    res.render('index', {});
  }
}
