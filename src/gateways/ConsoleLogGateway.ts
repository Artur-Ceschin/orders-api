import { Injectable } from '../di/Injectable';
import { ILogGateway } from '../Interfaces/gateways/ILogGateway';

@Injectable()
export class ConsoleLogGateway implements ILogGateway {
  async log(logMessage: Record<string, unknown>) {
    console.log('Log service');
    console.log(JSON.stringify(logMessage, null, 2));
  }
}
