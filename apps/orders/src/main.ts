import {NestFactory} from '@nestjs/core';
import {OrdersModule} from './orders.module';
import * as process from "node:process";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const kafka = await NestFactory.createMicroservice<MicroserviceOptions>(
        OrdersModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:9092'],
                },

                producer: {
                    allowAutoTopicCreation: true,
                },
                consumer: {
                    groupId: 'orders-consumer',
                    allowAutoTopicCreation: true,
                }
            },
        },
    );
    await kafka.listen();
    const app = await NestFactory.create(OrdersModule);
    await app.listen(process.env.port ?? 3000);
    console.log(`order service is listening to port: ${process.env.port ?? 3000}`);
}

bootstrap();
