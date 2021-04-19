import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseResult, CoreResponseResult } from './transform.interface';
import { Response } from 'express';
import { PaginateResult } from 'mongoose';
import { MessageEnum } from '../constants/message.enum';
import { HelperService } from '@core/services/helper.services';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransformInterceptor implements NestInterceptor<ResponseResult> {
  constructor(
    private readonly helperService: HelperService,
    private readonly configService: ConfigService,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseResult> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((result: CoreResponseResult) => {
        result.data = this.helperService.formatResult(result.data);
        let payload: any = result.data;
        if (typeof result.data === 'object') {
          const { password, __v, ...data } = result.data;
          payload = data;
        }
        const tokenKey = this.configService.get('cookie.tokenKey');
        const expiresIn: string =
          this.configService.get('jwt.expiresIn') || '60s';
        if (result.setToken) {
          response.cookie(tokenKey, payload, {
            secure: !this.configService.get('node.debug'),
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000),
          });
          response.setHeader(tokenKey, payload);
        }
        return {
          success: true,
          result: {
            message: result.message || MessageEnum.SUCCESS,
            payload,
          },
          error: null,
        };
      }),
    );
  }
}
