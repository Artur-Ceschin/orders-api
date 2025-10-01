import { container } from './di/container';
import fastify from 'fastify';

import { PlaceOrder } from './useCases/PlaceOrder';
const app = fastify();

app.post('/checkout', async (request, reply) => {

  const placeOrder = new PlaceOrder(container);

  const { orderId } = await placeOrder.execute();
  reply.status(201).send({ orderId });
});

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});
