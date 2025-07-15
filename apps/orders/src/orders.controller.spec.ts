import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { orderCreatedTestDto } from '../test/data-test/orderCreatedTestDto';
import { MicroserviceOptions } from '@nestjs/microservices';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();
    app.createNestMicroservice<MicroserviceOptions>(app.get('KAFKA_SERVICE'));
    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create order', () => {
    it('should sent event to kafka', () => {
      expect(ordersController.createOrder(orderCreatedTestDto)).toBe({
        message: 'Order created successfully sent to kafka',
      });
    });
  });
});
