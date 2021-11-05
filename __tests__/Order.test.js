const pool = require('../lib/utils/pool');
const setup = require('../data/setup.js');
const OrderService = require('../lib/services/OrderService.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));
