import { QueryRunner } from 'typeorm';
import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';
import { validateWriteMessage } from './validation';
import { Message } from '../model/model';
import { writeMessageStore } from '../db/writeMessage';

const writeMessage: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await postgres.connect();
  const { token } = event.headers;
  if (token == null) {
    return {
      statusCode: 500,
      body: 'Unauthorized',
    };
  }
  const body = JSON.parse(event.body) as Exclude<Message, 'id'>;
  const errors = validateWriteMessage(body);
  if (errors != null) {
    return errors;
  }

  const { fromUser, toUsers, message } = body;
  const queryRunner = await postgres.getQueryRunner();
  await writeMessageStore({ fromUser, toUsers, message, queryRunner });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: body.message }),
  };
};

export { writeMessage };
