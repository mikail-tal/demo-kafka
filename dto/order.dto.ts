import {IsArray, IsEmail} from 'class-validator';

export class OrderDto {
    readonly id: string = crypto.randomUUID();

    @IsEmail()
    email: string;

    @IsArray()
    items: {
        productId: string;
        quantity: number;
    }[];
}
