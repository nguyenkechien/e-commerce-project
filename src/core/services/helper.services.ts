import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageEnum } from '../constants/message.enum';
import { PaginateResult } from 'mongoose';
import {
  ConditionsQuery,
  ResJsonParam,
  ResJsonReturn,
} from './helper.interface';
import { isArray } from '@src/helpers';

@Injectable()
class HelperService {
  private crypt: any;

  constructor(private configService: ConfigService) {}

  getMongoUri(): string {
    const db = {
      driver: this.getConfig('mongooseConfig.driver'),
      host: this.getConfig('mongooseConfig.host'),
      port: this.getConfig('mongooseConfig.port'),
      name: this.getConfig('mongooseConfig.name'),
      user: this.getConfig('mongooseConfig.user'),
      pass: encodeURIComponent(this.getConfig('mongooseConfig.pass')),
      auth: this.getConfig('mongooseConfig.auth'),
    };
    let userConfigConnect: string = '';
    if (db.user) {
      userConfigConnect = `${db.user}:${db.pass}@`;
    }
    const mogoUri: string = `${db.driver}://${userConfigConnect}${db.host}:${db.port}/${db.name}`;
    return mogoUri + `${db.auth ? `?authSource=${db.auth}` : ''}`;
  }
  private getConfig(configKey: string): any {
    return this.configService.get(configKey);
  }

  resJson({ successMsg, payload, errorMsg }: ResJsonParam): ResJsonReturn {
    const res: ResJsonReturn = {
      success: true,
      result: {
        message: successMsg,
        payload,
      },
      error: null,
    };
    if (!payload) {
      res.success = false;
      res.result = null;
      res.error = {
        code: 1,
        message: errorMsg,
      };
    }
    return res;
  }

  getQueryPaginate(query: Record<string, any>) {
    const { select, page, limit, orderBy, order, name } = query;
    const filterQuery: ConditionsQuery = {};
    if (name) {
      filterQuery.name = { $regex: new RegExp(name) };
    }
    let selectArr = ['-__v', '-password'];
    if (select) {
      selectArr = [...selectArr, ...select.split(',')];
    }
    const optionQuery = {
      select: selectArr,
      page: page || 1,
      limit: limit || 5,
      sort: {
        [orderBy]: order,
      },
    };
    return {
      filterQuery,
      optionQuery,
    };
  }

  throwException(
    message?: string,
    statusCode?: number,
    data?: Record<any, any>,
  ): HttpException {
    throw new HttpException(
      {
        code: statusCode || HttpStatus.NOT_FOUND,
        message: message || MessageEnum.UNKNOWN_ERROR,
        data: data || null,
      },
      statusCode || HttpStatus.NOT_FOUND,
    );
  }

  formatResult(data: Record<any, any>) {
    if (data?.docs) {
      const paginator = data as PaginateResult<any>;
      data = {
        items: paginator.docs,
        total: paginator.totalDocs,
        pages: paginator.totalPages,
        hasNextPage: paginator.hasNextPage,
        hasPrevPage: paginator.hasPrevPage,
        curentPage: paginator.page,
      };
    }
    if (isArray(data)) data = { items: data, total: data.length };
    if (data.toJSON) data = data.toJSON();
    return data;
  }
}
export { ConditionsQuery, ResJsonReturn, ResJsonParam, HelperService };
