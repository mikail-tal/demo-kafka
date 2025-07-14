import {NestFactory} from '@nestjs/core';
import {NotificationsModule} from './notifications.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";


async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        NotificationsModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'logs-service',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'notifications-consumer',
                    allowAutoTopicCreation: true
                }
            },
        },
    );
    await app.listen();
}

bootstrap();

