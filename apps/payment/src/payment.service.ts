import {Inject, Injectable} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";
import {PaymentDto} from "../../../dto/payment.dto";

@Injectable()
export class PaymentService {
    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    orderPaymentSuccessed(payment: PaymentDto) {

        const delivery = {
            idOrder: payment.idOrder,
            email: payment.email,
            adresse: "5 rue de la victoire 59000 Lille",
            status: 'to-deliver',
        }

        this.kafkaClient.emit('order.payment-processed', delivery);

        return {
            message: 'Order payment processed successfully, event sent to kafka...',
        };
    }
}
