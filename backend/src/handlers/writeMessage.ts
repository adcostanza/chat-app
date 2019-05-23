import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';
import { writeMessageStore } from '../db/writeMessage';
import { Message } from '../model/model';
import { decodeToken } from '../utils/jwt';
import { validateWriteMessage } from '../utils/validation';

const writeMessage: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  //TODO put into a middleware
  try {
    JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'invalid JSON' }),
    };
  }

  //TODO put into a middleware
  const { token } = event.headers;
  if (token == null) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    decodeToken(token);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }
  const body = JSON.parse(event.body) as Exclude<Message, 'id'>;
  const errors = validateWriteMessage(body);
  if (errors != null) {
    return errors;
  }

  await postgres.connect();

  const { fromUser, toUsers, message } = body;
  const queryRunner = await postgres.getQueryRunner();
  await writeMessageStore({ fromUser, toUsers, message, queryRunner });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

export { writeMessage };
