import {Controller, Get} from '@nestjs/common';
import {LogsService} from './logs.service';
import {Ctx, EventPattern, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";
import {OrderDto} from "../../../dto/order.dto";

@Controller()
export class LogsController {
    constructor(private readonly logsService: LogsService) {
    }

    @Get()
    getHello(): string {
        return this.logsService.getHello();
    }

    // TODO : connect bdd to store logs

    // permet de consommer sans retourer un message
    @EventPattern('order.created')
    handleOrderCreated(@Payload() order: OrderDto, @Ctx() context: KafkaContext) {
        console.log(order);
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
    }

    @EventPattern('order.payment-started')
    orderPaymentStarted(@Payload() data: any, @Ctx() context: KafkaContext) {
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
    }

    @EventPattern('order.payment-processed')
    orderPaymentPrcessed(@Payload() data: any, @Ctx() context: KafkaContext) {
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
    }

    @EventPattern('order.completed')
    orderCompleted(@Payload() data: any, @Ctx() context: KafkaContext) {
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
    }


    // recevoir un message et permet de retourner une reply
    @MessagePattern('order.get-logs')
    getOrderLogs() {
        return {
            type: 'create.order',
            message: 'message bien reçu'
        };
    }
}
