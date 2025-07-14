import {Inject, Injectable} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";

@Injectable()
export class DeliveryService {

    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    orderCompleted(payment: any) {
        console.log(payment);
        // start livraison when payment is done
        this.kafkaClient.emit('order.completed', payment);

        return {
            message: 'Order delivered successfully, event sent to kafka...',
        };
    }
}
