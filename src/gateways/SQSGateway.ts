import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';


export class SQSGateway {
  private client = new SQSClient({ region: 'us-east-1' });

  async plublicMesage(message: Record<string, unknown>) {
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/058264487329/ProcessPaymentQueue',
      MessageBody: JSON.stringify(message),
    });

    await this.client.send(sendMessageCommand);
  }
}
