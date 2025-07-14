import {Controller, Get} from '@nestjs/common';
import {DeliveryService} from './delivery.service';
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {DeliveryDto} from "../../../dto/delivery.dto";

@Controller()
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {
    }

    @Get()
    getHello(): string {
        return this.deliveryService.getHello();
    }

    @EventPattern('order.payment-processed')
    orderCompleted(@Payload() deliveryDto: DeliveryDto, @Ctx() context: KafkaContext) {
        console.log(`message received from topic:${context.getTopic()} in partition:${context.getPartition()}`);
        this.deliveryService.orderCompleted(deliveryDto);
    }
}
