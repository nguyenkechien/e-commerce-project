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
import { MessageEnum } from '../constants/message.enum';
import { HelperService } from '@utils/services/helper.services';
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
        const payload: any = result.data;

        let expiresIn;
        if (result.setToken) {
          const tokenKey = this.configService.get('cookie.tokenKey');
          const jwtExpiresIn = this.configService.get('jwt.expiresIn');
          expiresIn = this.helperService.getSeconds(jwtExpiresIn);
          response.cookie(tokenKey, payload, {
            secure: !this.configService.get('node.debug'),
            httpOnly: true,
            expires: new Date(Date.now() + expiresIn * 1000),
          });
          response.setHeader(tokenKey, payload);
        }
        const message = result.message || MessageEnum.SUCCESS;
        const res = this.helperService.jsonReturn({
          message,
          data: payload,
          expiresIn,
        });
        return res.success;
      }),
    );
  }
}
