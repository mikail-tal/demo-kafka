import {Controller} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {PaymentDto} from "../../../dto/payment.dto";

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {
    }

    @EventPattern('order.payment-started')
    orderPaymentStarted(@Payload() paymentInfo: PaymentDto, @Ctx() context: KafkaContext) {
        console.log(`message received from topic:${context.getTopic()} in partition:${context.getPartition()}`);
        this.paymentService.orderPaymentSuccessed(paymentInfo);
    }
}
