import {Injectable} from '@nestjs/common';

@Injectable()
export class LogsService {
    getHello(): string {
        return 'Hello World!';
    }
}
