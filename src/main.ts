import { makePlaceOrder } from 'factories/makePlaceOrder';
import fastify from 'fastify';
const app = fastify();

app.post('/checkout', async (request, reply) => {

  const placeOrder = makePlaceOrder();

  const { orderId } = await placeOrder.execute();

  reply.status(201).send({ orderId });
});

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});
