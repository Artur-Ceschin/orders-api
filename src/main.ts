import 'reflect-metadata';

import fastify from 'fastify';
import { container } from './di/container';
import { PlaceOrder } from './useCases/PlaceOrder';

const app = fastify();

app.post('/checkout', async (request, reply) => {
  const placeOrder = container.resolve<PlaceOrder>('PlaceOrder');

  const { orderId } = await placeOrder.execute();
  reply.status(201).send({ orderId });

});

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});
