
import 'reflect-metadata';
import { Order } from '../entities/Order';
import { IOrdersRepository } from '../Interfaces/repositories/IOrderRepository';
import { IQueueGateway } from '../Interfaces/gateways/IQueueGateway';
import { IEmailGateway } from '../Interfaces/gateways/IEmailGateway';
import { Injectable } from '../di/Injectable';
import { Inject } from '../di/Inject';

@Injectable()
export class PlaceOrder {
  constructor(
    @Inject('DynamoOrdersRepository') private readonly ordersRepository: IOrdersRepository,
    @Inject('SQSGateway') private readonly queueGateway: IQueueGateway,
    @Inject('SESGateway') private readonly emailGateway: IEmailGateway,
  ) {}

  async execute() {
    const customerEmail = 'customer@example.com';
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);

    await this.ordersRepository.create(order);

    await this.queueGateway.publicMessage({ order: order.id });

    await this.emailGateway.sendEmail({
      from: 'noreply@example.com',
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
