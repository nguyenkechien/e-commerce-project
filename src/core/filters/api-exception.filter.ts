import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MessageEnum } from '../constants/message.enum';
interface ResJson {
  code?: number;
  message?: string;
}
const resJson = (error: ResJson | string) => {
  if (typeof error === 'string') {
    error = {
      code: HttpStatus.BAD_REQUEST,
      message: error,
    };
  }
  return {
    success: false,
    result: null,
    error: {
      ...error,
    },
  };
};
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

      return response.status(statusCode).json(
        resJson({
          code: statusCode,
          message: exception['response']['message'],
        }),
      );
    }

    if (
      ['CastError', 'ValidationError'].includes(
        exception['constructor']['name'],
      )
    ) {
      const statusCode = HttpStatus.BAD_REQUEST;
      const message = exception['message'];
      return response
        .status(statusCode)
        .json(resJson({ code: statusCode, message }));
    }

    if (exception instanceof ForbiddenException) {
      const statusCode = HttpStatus.FORBIDDEN;
      const message = 'Permission denied!';
      return response
        .status(statusCode)
        .json(resJson({ code: statusCode, message }));
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const error = exception.getResponse();
      return response.status(statusCode).json(resJson(error));
    }

    if (
      (exception['code'] || '') == 11000 &&
      typeof exception['errmsg'] != 'undefined'
    ) {
      const message =
        exception['errmsg'].substring(
          exception['errmsg'].indexOf('index: ') + 7,
          exception['errmsg'].indexOf('_1'),
        ) + ' must be unique';
      const statusCode = exception.statusCode || HttpStatus.BAD_REQUEST;

      return response
        .status(statusCode)
        .json(resJson({ message, code: statusCode }));
    }

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    return response
      .status(statusCode)
      .json(resJson({ message: MessageEnum.SERVER_ERROR, code: statusCode }));
  }
}
