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
import { HelperService } from '@utils/services/helper.services';

@Catch()
export class AllExceptionFilter<T> extends BaseExceptionFilter
  implements ExceptionFilter {
  constructor(private readonly helperService: HelperService) {
    super();
  }
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    if (exception instanceof BadRequestException) {
      const statusCode = HttpStatus.BAD_REQUEST;
      const message = exception['response']['message'];
      const resError = this.helperService.jsonReturn({ message, statusCode });
      return response.status(statusCode).json(resError.error);
    }

    if (
      ['CastError', 'ValidationError'].includes(
        exception['constructor']['name'],
      )
    ) {
      const statusCode = HttpStatus.BAD_REQUEST;
      const message = exception['message'];
      const resError = this.helperService.jsonReturn({ message, statusCode });
      return response.status(statusCode).json(resError.error);
    }

    if (exception instanceof ForbiddenException) {
      const statusCode = HttpStatus.FORBIDDEN;
      const message = 'Permission denied!';
      const resError = this.helperService.jsonReturn({ message, statusCode });
      return response.status(statusCode).json(resError.error);
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const error = exception.getResponse();
      let props = {};
      if (typeof error === 'string') {
        props = { message: error };
      } else props = error;
      const resError = this.helperService.jsonReturn({ statusCode, ...props });
      return response.status(statusCode).json(resError.error);
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
      const resError = this.helperService.jsonReturn({ message, statusCode });
      return response.status(statusCode).json(resError.error);
    }

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = MessageEnum.SERVER_ERROR;
    const resError = this.helperService.jsonReturn({ message, statusCode });
    return response.status(statusCode).json(resError.error);
  }
}
