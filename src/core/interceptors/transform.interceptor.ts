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

@Injectable()
export class TransformInterceptor implements NestInterceptor<ResponseResult> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseResult> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((result: CoreResponseResult) => {
        return {
          success: true,
          result: {
            message: result.message,
            payload: result.data,
          },
        };
      }),
    );
  }
}
