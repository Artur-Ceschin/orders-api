
import { SESGateway } from '../gateways/SESGateway';
import { SQSGateway } from '../gateways/SQSGateway';
import { DynamoOrdersRepository } from '../repository/DynamoOrdersRepository';
import { Order } from '../entities/Order';

export class PlaceOrder {
  constructor(
    private readonly dynamoOrdersRepository: DynamoOrdersRepository,
    private readonly sqsGateway: SQSGateway,
    private readonly sesGateway: SESGateway,
  ) {}

  async execute() {

    const customerEmail = 'artur.ceschin@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);
    await this.dynamoOrdersRepository.create(order);
    await this.sqsGateway.plublicMesage({ order: order.id });

    await this.sesGateway.sendEmail({
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
