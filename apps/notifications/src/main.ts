import {NestFactory} from '@nestjs/core';
import {NotificationsModule} from './notifications.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
        NotificationsModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'notifications-service',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'notifications-consumer',
                },
                producer: {
                    allowAutoTopicCreation: true,
                },
            },
        },
    );
    await kafkaApp.listen();

    // si on veut ecouter aux appel http
    // const app = await NestFactory.create(NotificationsModule);
    // await app.listen(3001)
}


bootstrap();
