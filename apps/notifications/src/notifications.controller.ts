import {Controller} from '@nestjs/common';
import {NotificationsService} from './notifications.service';
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {OrderDto} from "../../../dto/order.dto";

@Controller()
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {
    }

    @EventPattern('order.created')
    handleOrderCreated(@Payload() order: OrderDto, @Ctx() context: KafkaContext) {
        console.log(order);
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
        this.notificationsService.startPaymentProcess(order);
    }
}
