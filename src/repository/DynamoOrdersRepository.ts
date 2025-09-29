import { Order } from '../entities/Order';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export class DynamoOrdersRepository {
  private client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: 'us-east-1' }),
  );

  async create(order: Order) {
    const putItemCommand = new PutCommand({
      TableName: 'Orders',
      Item: {
        key: order.id,
        email: order.email,
        amount: order.amount,
      },
    });

    await this.client.send(putItemCommand);
  }
}
