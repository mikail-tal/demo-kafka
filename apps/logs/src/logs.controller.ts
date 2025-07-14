import { Controller, Get } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller()
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  getHello(): string {
    return this.logsService.getHello();
  }
}
