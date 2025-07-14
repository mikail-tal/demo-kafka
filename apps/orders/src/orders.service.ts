import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientKafkaProxy} from "@nestjs/microservices";
import {OrderDto} from "../../../dto/order.dto";

@Injectable()
export class OrdersService implements OnModuleInit {
    constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafkaProxy) {
    }

    onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('order.get-logs');
    }

    async createOrder(order: OrderDto) {
        //emit a message to kafka envoyer sans attendre le retour de message
        this.kafkaClient.emit('order.created', {key: order.id, value: order}); // Message: value, key, headers
        // Logic for creating an order
        return {
            message: 'Order created successfully sent to kafka',
        };
    }

    async getOrderLogs(id: number) {
        return this.kafkaClient.send('order.get-logs', {id});
    }
}
