import {NestFactory} from '@nestjs/core';
import {PaymentModule} from './payment.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PaymentModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'payment-consumer',
                    allowAutoTopicCreation: true
                }
            },
        },
    );
    await app.listen();
}

bootstrap();
