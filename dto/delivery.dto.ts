import {IsEmail} from "class-validator";

export class DeliveryDto {

    idOrder: string;

    @IsEmail()
    email: string;

    status: string;

    adresse: string;
}