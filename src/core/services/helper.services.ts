import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  ConditionsQuery,
  ResJsonParam,
  ResJsonReturn,
} from './helper.interface';

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
    const optionQuery = {
      select,
      page: page || 1,
      limit: limit || 10,
      sort: {
        [orderBy]: order,
      },
    };
    return {
      filterQuery,
      optionQuery,
    };
  }
}
export { ConditionsQuery, ResJsonReturn, ResJsonParam, HelperService };