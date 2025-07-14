import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {OrderDto} from "../../../dto/order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    createOrder(@Body() order: OrderDto) {
        return this.ordersService.createOrder(order);
    }

    @Get(':id/logs')
    getOrdersLogs(@Param('id') id: number) {
        return this.ordersService.getOrderLogs(id);
    }

    @EventPattern('order.get-logs.reply')
    handleReply(@Payload() data: any, @Ctx() context: KafkaContext) {
        console.log(data);
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
    }

    @EventPattern('order.completed')
    orderCompleted(@Payload() data: any, @Ctx() context: KafkaContext) {
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
    }
}
