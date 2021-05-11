import { Controller, UseFilters } from '@nestjs/common';
import { ViewExceptionFilter } from '@utils/filters/exception.filter';

@Controller()
export class AppController {
  constructor() {}
}
