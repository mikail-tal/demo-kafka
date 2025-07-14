import {IsArray, IsEmail} from 'class-validator';

export class OrderDto {

    id: string;

    status: string;

    adresse: string;

    @IsEmail()
    email: string;

    @IsArray()
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];


}
