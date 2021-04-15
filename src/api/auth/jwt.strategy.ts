import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTConstants } from '@src/core/constants/constants.enum';
import { AuthService } from './auth.service';

/**
 * TODO:
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTConstants.secret,
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.getAuthenticatedUser(
      username,
      password,
    );
    return user;
  }
}
