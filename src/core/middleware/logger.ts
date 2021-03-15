import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('body', req.body, ',\n');
    console.log('headers', req.headers, ',\n');
    console.log('query', req.query, ',\n');
    next();
  }
}
