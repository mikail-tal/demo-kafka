import {NestFactory} from '@nestjs/core';
import {LogsModule} from './logs.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        LogsModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'logs-service',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'logs-consumer',
                    allowAutoTopicCreation: true
                }
            },
        },
    );
    await app.listen();
}

bootstrap();
