const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert(quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
  //can comment out 19-22
  static async findOrderById(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${id}`
    );
    const order = await Order.getById(id);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
  static async update(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Update Order for ${id}, with ${quantity}`
    );
    const order = await Order.update(id, quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
  static async delete(id) {
    await sendSms(process.env.ORDER_HANDLER_NUMBER, `Delete Order for ${id}`);
    const order = await Order.deleteId(id);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
  static async getAll() {
    const order = await Order.getAllOrders();
    // order.id === some string
    // order.quantity === quantity
    console.log('orderservice.js', order);
    return order;
  }
};

//all one class, adding static method to the class(line 16.5)
