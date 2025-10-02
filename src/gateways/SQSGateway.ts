import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '../di/Injectable';
import { IQueueGateway } from '../Interfaces/gateways/IQueueGateway';


@Injectable()
export class SQSGateway implements IQueueGateway {
  private client = new SQSClient({ region: 'us-east-1' });

  async publicMessage(message: Record<string, unknown>) {
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/058264487329/ProcessPaymentQueue',
      MessageBody: JSON.stringify(message),
    });

    await this.client.send(sendMessageCommand);
  }
}
