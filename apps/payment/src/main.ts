import {NestFactory} from '@nestjs/core';
import {PaymentModule} from './payment.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {DeliveryModule} from "../../delivery/src/delivery.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PaymentModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'payment-service',
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
