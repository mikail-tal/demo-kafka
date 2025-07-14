import {Module} from '@nestjs/common';
import {LogsController} from './logs.controller';
import {LogsService} from './logs.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092'],
                    },
                }
            }
        ])
    ],
    controllers: [LogsController],
    providers: [LogsService],
})
export class LogsModule {
}
