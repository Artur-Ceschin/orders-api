import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'node:crypto';
import {
  SendMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

export class PlaceOrder {
  async execute() {
    const customerEmail = 'artur.ceschin@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);
    const orderId = randomUUID();


    //Save on database
    const dbClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: 'us-east-1',
      }),
    );
    const putItemCommand = new PutCommand({
      TableName: 'Orders',
      Item: {
        key: orderId,
        email: customerEmail,
        amount,
      },
    });

    await dbClient.send(putItemCommand);

    //Send message to queue
    const sqsClient = new SQSClient({ region: 'us-east-1' });
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl:
        'https://sqs.us-east-1.amazonaws.com/058264487329/ProcessPaymentQueue',
      MessageBody: JSON.stringify({ orderId }),
    });

    await sqsClient.send(sendMessageCommand);


    //Send email
    const sesClient = new SESClient({ region: 'us-east-1' });
    const sendEmailCommand = new SendEmailCommand({
      Source: 'artur.ceschin@gmail.com',
      Destination: {
        ToAddresses: [customerEmail],
      },
      Message: {
        Subject: {
          Charset: 'utf-8',
          Data: 'Order placed successfully',
        },
        Body: {
          Html: {
            Charset: 'utf-8',
            Data: `
              <h1>Order placed successfully</h1>
              <p>Soon you will receive a confirmation email with the order details.</p>
            `,
          },
          Text: {
            Charset: 'utf-8',
            Data: 'Order placed successfully. Soon you will receive a confirmation email with the order details.',
          },
        },
      },
    });

    await sesClient.send(sendEmailCommand);

    return { orderId };
  }
}
