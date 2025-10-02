import { DynamoOrdersRepository } from '../repository/DynamoOrdersRepository';
import { Registry } from './Registry';
import { SESGateway } from '../gateways/SESGateway';
import { SQSGateway } from '../gateways/SQSGateway';

export const container = Registry.getInstance();

container.register( DynamoOrdersRepository);
container.register(SQSGateway);
container.register(SESGateway);

