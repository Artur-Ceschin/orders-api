
import { SESGateway } from '../gateways/SESGateway';
import { SQSGateway } from '../gateways/SQSGateway';
import { DynamoOrdersRepository } from '../repository/DynamoOrdersRepository';
import { Order } from '../entities/Order';

export class PlaceOrder {
  async execute() {
    const customerEmail = 'artur.ceschin@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);
    const dynamoOrdersRepository = new DynamoOrdersRepository();
    await dynamoOrdersRepository.create(order);

    const sqsGateway = new SQSGateway();
    await sqsGateway.plublicMesage({ order: order.id });

    const sesGateway = new SESGateway();

    await sesGateway.sendEmail({
      from: 'Artur Ceschin <noreply@arturceschin.com>',
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
