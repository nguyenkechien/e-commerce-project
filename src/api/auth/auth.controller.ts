import {
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '@src/core/interceptors/transform.interceptor';
import { CoreResponseResult } from '@src/core/interceptors/transform.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<CoreResponseResult> {
    const payload = await this.authService.login(req.user);
    return { data: payload, setToken: true };
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any): Promise<CoreResponseResult> {
    const user = await this.usersService.findOne(req.user.email);
    return { data: user };
  }
}
