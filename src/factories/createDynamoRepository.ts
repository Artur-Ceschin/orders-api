import { DynamoOrdersRepository } from '../repository/DynamoOrdersRepository';
import { Registry } from '../di/Registry';

export function makeDynamoOrderRepository() {
  return Registry.getInstance().resolve(DynamoOrdersRepository);
}
