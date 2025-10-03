import { Registry } from './Registry';

// Import all services to trigger @Injectable() decorators
import '../repository/DynamoOrdersRepository';
import '../gateways/SQSGateway';
import '../gateways/SESGateway';
import '../gateways/ConsoleLogGateway';
import '../useCases/PlaceOrder';

export const container = Registry.getInstance();
