import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from "@nestjs/common";
import {OrdersModule} from "./orders.module";
import * as request from 'supertest';
import {orderCreatedTestDto} from "../test/data-test/orderCreatedTestDto";
import {Kafka, logLevel} from "kafkajs";

describe('OrdersController (e2e)', () => {
    let app: INestApplication;
    // let producer: any;
    //
    // const kafka = new Kafka({
    //     clientId: 'e2e-test-client',
    //     brokers: ['localhost:9092'],
    //     logLevel: logLevel.ERROR,
    // });

    beforeAll(async () => {
        const orderModuleTest: TestingModule = await Test.createTestingModule({
            imports: [OrdersModule],
            // providers: [
            //     {
            //         provide: 'KAFKA_SERVICE',
            //         useValue: {
            //             emit: jest.fn(),
            //             send: jest.fn(),
            //             subscribeToResponseOf: jest.fn(),
            //         }
            //     }
            // ]
        }).compile();

        app = orderModuleTest.createNestApplication();
        await app.init();
    });

    it('/POST orders', () => {
        return request(app.getHttpServer())
            .post('/orders')
            .send(orderCreatedTestDto)
            .expect(201);
    });

    it('/GET orders/:id/logs', () => {
        return request(app.getHttpServer())
            .get('/orders/1/logs')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
