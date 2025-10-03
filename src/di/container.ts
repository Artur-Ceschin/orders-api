import { Registry } from './Registry';
import { DynamoOrdersRepository } from '../repository/DynamoOrdersRepository';
import { SQSGateway } from '../gateways/SQSGateway';
import { SESGateway } from '../gateways/SESGateway';
import { ConsoleLogGateway } from '../gateways/ConsoleLogGateway';

export const container = Registry.getInstance();

container.registerToken('OrdersRepository', DynamoOrdersRepository);
container.registerToken('QueueGateway', SQSGateway);
container.registerToken('EmailGateway', SESGateway);
container.registerToken('LogGateway', ConsoleLogGateway);
