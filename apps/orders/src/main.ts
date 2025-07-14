import {NestFactory} from '@nestjs/core';
import {OrdersModule} from './orders.module';
import * as process from "node:process";

async function bootstrap() {
    const app = await NestFactory.create(OrdersModule);
    await app.listen(process.env.port ?? 3000);
    console.log(`app is listening to port: ${process.env.port ?? 3000}`);
}

bootstrap();
