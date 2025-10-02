import { PlaceOrder } from 'useCases/PlaceOrder';
import { makeDynamoOrderRepository } from './createDynamoRepository';
import { makeSESGateway } from './makeSESGateway';
import { makeSQSGateway } from './makeSQSGateway';


export function makePlaceOrder() {
  return new PlaceOrder(
    makeDynamoOrderRepository(),
    makeSQSGateway(),
    makeSESGateway(),
  );
}
