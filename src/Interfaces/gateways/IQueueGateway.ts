export interface IQueueGateway {
  publicMessage(message: Record<string, unknown>): Promise<void>;
}
