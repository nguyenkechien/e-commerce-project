import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionFilter<T> extends BaseExceptionFilter
  implements ExceptionFilter {
  constructor() {
    super();
  }
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    if (exception instanceof BadRequestException) {
      const statusCode = HttpStatus.BAD_REQUEST;
      response.status(statusCode).json({
        success: false,
        result: null,
        error: {
          code: statusCode,
          message: exception['response']['message'],
        },
      });
    } else if (
      ['CastError', 'ValidationError'].includes(
        exception['constructor']['name'],
      )
    ) {
      const statusCode = HttpStatus.BAD_REQUEST;
      const message = exception['message'];
      response.status(statusCode).json({
        success: false,
        result: null,
        error: {
          code: statusCode,
          message: message,
        },
      });
    }
  }
}
