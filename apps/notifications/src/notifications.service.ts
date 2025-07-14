import {Inject, Injectable} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";
import {OrderDto} from "../../../dto/order.dto";

@Injectable()
export class NotificationsService {
    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    startPaymentProcess(order: OrderDto) {
        // create object payment
        const payment = {
            idOrder: order.id,
            email: order.email,
            totalPrice: order.items.reduce((total, item) => total + item.price * item.quantity, 0),
            status: 'pending',
        }
        this.kafkaClient.emit('order.payment-started', payment);

        return {
            message: 'Order payment started successfully, event sent to kafka...',
        };
    }
}
