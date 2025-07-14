import {Controller, Get} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {
    }

    @Get()
    getHello(): string {
        return this.paymentService.getHello();
    }

    @EventPattern('order.payment-started')
    orderPaymentStarted(@Payload() paymentInfo: any, @Ctx() context: KafkaContext) {
        console.log(`message received from topic: ', ${context.getTopic()} in partition: ', ${context.getPartition()}`);
        this.paymentService.orderPaymentSuccessed(paymentInfo);
    }
}
