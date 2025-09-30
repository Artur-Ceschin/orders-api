import { Order } from '../entities/Order';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { IOrdersRepository } from 'Interfaces/repositories/IOrderRepository';

export class DynamoOrdersRepository implements IOrdersRepository {
  private client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: 'us-east-1' }),
  );

  async create(order: Order) {
    const command = new PutCommand({
      TableName: 'Orders',
      Item: {
        key: order.id,
        email: order.email,
        amount: order.amount,
      },
    });

    await this.client.send(command);
  }
}
