const pool = require('../lib/utils/pool');
const setup = require('../data/setup.js');
const OrderService = require('../lib/services/OrderService.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Order Service Test', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await OrderService.createOrder(2);
  });
  it('should create an item', async () => {
    const order = await OrderService.createOrder(2);
    expect(order).toEqual({ id: '2', quantity: 2 });
  });
  it('update by id', async () => {
    const order = await OrderService.update(1, 2);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('should get by id', async () => {
    const order = await OrderService.createOrder(1);
    expect(order).toEqual({ id: '2', quantity: 1 });
  });
  it('should delete by id', async () => {
    const order = await OrderService.delete(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('should get all', async () => {
    const order = await OrderService.getAll();
    expect(order).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          quantity: expect.any(Number),
        },
      ])
    );
  });
});
