import fastify from 'fastify';
import { PlaceOrder } from './useCases/PlaceOrder';
import { DynamoOrdersRepository } from './repository/DynamoOrdersRepository';
import { SESGateway } from './gateways/SESGateway';
import { SQSGateway } from './gateways/SQSGateway';

const app = fastify();

app.post('/checkout', async (request, reply) => {

  const dynamoOrdersRepository = new DynamoOrdersRepository();
  const sqsGateway = new SQSGateway();
  const sesGateway = new SESGateway();

  const placeOrder = new PlaceOrder(
    dynamoOrdersRepository,
    sqsGateway,
    sesGateway,
  );

  const { orderId } = await placeOrder.execute();

  reply.status(201).send({ orderId });
});

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});
