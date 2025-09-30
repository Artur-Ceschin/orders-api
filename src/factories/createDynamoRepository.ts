import { DynamoOrdersRepository } from 'repository/DynamoOrdersRepository';

export function makeDynamoOrderRepository() {

  return new DynamoOrdersRepository();
}
