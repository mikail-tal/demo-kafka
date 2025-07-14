import {Inject, Injectable} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";
import {DeliveryDto} from "../../../dto/delivery.dto";
import {OrderDto} from "../../../dto/order.dto";

@Injectable()
export class DeliveryService {

    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    orderCompleted(data: DeliveryDto) {
        const orderCompleted: OrderDto = {
            id: data.idOrder,
            status: 'delivered',
            adresse: data.adresse,
            email: data.email,
            items: [],
        }
        this.kafkaClient.emit('order.completed', orderCompleted);

        return {
            message: 'Order delivered successfully, event sent to kafka...',
        };
    }
}
