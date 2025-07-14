import {IsEmail} from "class-validator";

export class PaymentDto {

    idOrder: string;

    @IsEmail()
    email: string;

    totalPrice: number;

    status: string;
}