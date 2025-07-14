import {Inject, Injectable} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";

@Injectable()
export class PaymentService {
    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    orderPaymentSuccessed(payment: any) {
        console.log(payment);
        this.kafkaClient.emit('order.payment-processed', payment);

        return {
            message: 'Order payment processed successfully, event sent to kafka...',
        };
    }
}
