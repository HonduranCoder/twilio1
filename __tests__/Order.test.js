const pool = require('../lib/utils/pool');
const setup = require('../data/setup.js');
const Order = require('../lib/models/Order.js');
const OrderService = require('../lib/services/OrderService.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Order Test', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await OrderService.createOrder(2);
  });
  it('creates an order', async () => {
    const order = await Order.insert(4);
    expect(order).toEqual({
      id: '2',
      quantity: 4,
    });
  });
  it('update by id', async () => {
    const order = await Order.update(1, 2);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('should get by id', async () => {
    const order = await Order.getById(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('should delete by id', async () => {
    const order = await Order.deleteId(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('should get all', async () => {
    const order = await Order.getAllOrders();
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
