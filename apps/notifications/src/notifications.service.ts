import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";

@Injectable()
export class NotificationsService {
    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    startPaymentProcess(payment: any) {
        // create object payment
        console.log("paiment");
        this.kafkaClient.emit('order.payment-started', payment);

        return {
            message: 'Order payment started successfully, event sent to kafka...',
        };
    }
}
