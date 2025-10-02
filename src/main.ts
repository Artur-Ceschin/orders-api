import { container } from './di/container';
import fastify from 'fastify';
import { DynamoOrdersRepository } from './repository/DynamoOrdersRepository';
import { PlaceOrder } from './useCases/PlaceOrder';
import { SESGateway } from './gateways/SESGateway';
import { SQSGateway } from './gateways/SQSGateway';
const app = fastify();

app.post('/checkout', async (request, reply) => {

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
