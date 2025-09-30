import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { IEmailGateway } from 'Interfaces/gateways/IEmailGateway';


interface ISendEmailParams {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

export class SESGateway implements IEmailGateway{
  private client = new SESClient({ region: 'us-east-1' });

  async sendEmail({ from, to, subject, html} : ISendEmailParams) {
    const sendEmailCommand = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Subject: {
          Charset: 'utf-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'utf-8',
            Data: html,
          },
        },
      },
    });

    await this.client.send(sendEmailCommand);
  }
}
