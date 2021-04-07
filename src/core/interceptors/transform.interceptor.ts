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

@Injectable()
export class TransformInterceptor implements NestInterceptor<ResponseResult> {
  constructor(private readonly helperService: HelperService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseResult> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((result: CoreResponseResult) => {
        result.data = this.helperService.formatPaginateResult(result.data);
        return {
          success: true,
          result: {
            message: result.message || MessageEnum.SUCCESS,
            payload: result.data,
          },
          error: null,
        };
      }),
    );
  }
}
