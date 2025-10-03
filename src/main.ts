import 'reflect-metadata';

import fastify from 'fastify';
import { DynamoOrdersRepository } from './repository/DynamoOrdersRepository';
import { PlaceOrder } from './useCases/PlaceOrder';
import { SQSGateway } from './gateways/SQSGateway';
import { SESGateway } from './gateways/SESGateway';
import { Registry } from './di/Registry';
const app = fastify();

app.post('/checkout', async (request, reply) => {
  const container = Registry.getInstance();
  const placeOrder = new PlaceOrder(
    container.resolve(DynamoOrdersRepository),
    container.resolve(SQSGateway),
    container.resolve(SESGateway),
  );

  const { orderId } = await placeOrder.execute();
  reply.status(201).send({ orderId });

});

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});
