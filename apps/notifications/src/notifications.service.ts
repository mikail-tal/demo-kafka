import {Inject, Injectable} from '@nestjs/common';
import {ClientKafkaProxy, Payload} from "@nestjs/microservices";
import {OrderDto} from "../../../dto/order.dto";

@Injectable()
export class NotificationsService {
    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    startPaymentProcess(@Payload() order: OrderDto) {
        this.kafkaClient.emit('order.payment.started', order);
    }
}
