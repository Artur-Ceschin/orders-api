import 'reflect-metadata';
import { Order } from '../entities/Order';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '../di/Injectable';
import { Inject } from '../di/Inject';
import { IOrdersRepository } from '../Interfaces/repositories/IOrderRepository';
import { ILogGateway } from '../Interfaces/gateways/ILogGateway';

@Injectable()
export class DynamoOrdersRepository implements IOrdersRepository {
  private client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: 'us-east-1' }),
  );

  constructor(@Inject('ConsoleLogGateway') private readonly logGateway: ILogGateway) {}

  async create(order: Order) {
    const command = new PutCommand({
      TableName: 'Orders',
      Item: {
        key: order.id,
        email: order.email,
        amount: order.amount,
      },
    });

    await this.logGateway.log({
      message: 'Creating order',
      order,
    });

    await this.client.send(command);
  }
}
