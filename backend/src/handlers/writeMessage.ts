import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';

const writeMessage: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  await postgres.connect();
  const { token } = event.headers;
  if (token == null) {
    return {
      statusCode: 500,
      body: 'Unauthorized',
    };
  }
  const body = JSON.parse(event.body);
  if (!body.message) {
    return {
      statusCode: 400,
      body: 'message is a required property',
    };
  }

  return {
    statusCode: 200,
    body: body.message
  };
};

export { writeMessage };
