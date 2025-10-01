

import { Order } from '../entities/Order';
import { IOrdersRepository } from 'Interfaces/repositories/IOrderRepository';
import { IQueueGateway } from 'Interfaces/gateways/IQueueGateway';
import { IEmailGateway } from 'Interfaces/gateways/IEmailGateway';
import { DIContainer } from 'di/Registry';


export class PlaceOrder {
  constructor(private readonly container: DIContainer) {}

  async execute() {
    const customerEmail = 'artur.ceschin@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);

    await this.container.resolve<IOrdersRepository>('OrdersRepository').create(order);

    await this.container.resolve<IQueueGateway>('QueueGateway').publicMessage({ order: order.id });

    await this.container.resolve<IEmailGateway>('EmailGateway').sendEmail({
      from: 'artur.ceschin@gmail.com',
      to: [customerEmail],
      subject: `Order placed successfully number: ${order.id}`,
      html: `
        <h1>Order placed successfully</h1>
        <p>Soon you will receive a confirmation email with the order details.</p>
      `,
    });

    return { orderId: order.id };
  }
}
