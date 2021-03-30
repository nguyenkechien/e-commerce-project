import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
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
}
