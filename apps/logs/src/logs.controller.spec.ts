import { Test, TestingModule } from '@nestjs/testing';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

describe('LogsController', () => {
  let logsController: LogsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [LogsService],
    }).compile();

    logsController = app.get<LogsController>(LogsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(logsController.handleOrderCreated()).toBe('Hello World!');
    });
  });
});
