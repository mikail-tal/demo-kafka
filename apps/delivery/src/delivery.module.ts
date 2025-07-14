import {Module} from '@nestjs/common';
import {DeliveryController} from './delivery.controller';
import {DeliveryService} from './delivery.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'delivery-service',
                        brokers: ['localhost:9092'],
                    },
                }
            }
        ])
    ],
    controllers: [DeliveryController],
    providers: [DeliveryService],
})
export class DeliveryModule {
}
