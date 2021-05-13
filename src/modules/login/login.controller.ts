import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../api/auth/guard/jwt-auth.guard';

@Controller('login')
@UseGuards(JwtAuthGuard)
export class LoginController {
  @Get()
  @Render('pages/login.tsx')
  async root(@Request() req: any, @Response() res: any) {
    if (req.user) res.redirect('/');
    else return;
  }
}
