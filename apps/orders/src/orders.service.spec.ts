import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { orderCreatedTestDto } from '../test/data-test/orderCreatedTestDto';

describe('OrdersModule', () => {
  let ordersService: OrdersService;
  const kafkaClientMock = {
    emit: jest.fn(),
    send: jest.fn(),
    subscribeToResponseOf: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OrdersService,
        {
          provide: 'KAFKA_SERVICE',
          useValue: kafkaClientMock,
        },
      ],
    }).compile();

    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersService.onModuleInit(); // simulate lifecycle
  });

  it('should create an order and emit to Kafka', () => {
    const result = ordersService.createOrder(orderCreatedTestDto);

    expect(kafkaClientMock.emit).toHaveBeenCalledWith('order.created', {
      key: orderCreatedTestDto.id,
      value: orderCreatedTestDto,
    });

    expect(result.message).toBe('Order created successfully sent to kafka');
  });

  // it('should request order logs from Kafka', () => {
  //   const mockLogs = { logs: 'Log message' };
  //   kafkaClientMock.send.mockReturnValueOnce({
  //     subscribe: (cb: any) => cb(mockLogs),
  //   });
  //
  //   ordersService.getOrderLogs(1).subscribe((res) => {
  //     expect(res).toEqual(mockLogs);
  //   });
  // });
});
