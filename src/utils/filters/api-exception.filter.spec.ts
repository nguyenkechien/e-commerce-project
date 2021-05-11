import { AllExceptionFilter } from './api-exception.filter';

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AllExceptionFilter()).toBeDefined();
  });
});
