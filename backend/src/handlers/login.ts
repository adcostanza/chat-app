import { Callback, Context, Handler } from 'aws-lambda';
import { createToken } from '../utils/jwt';

const login: Handler = async (event: any, context: Context, callback: Callback) => {
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

  const body = JSON.parse(event.body);
  if (!body || !body.username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: 'username is a required property' }),
    };
  }
  const accessToken = createToken(body.username);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      accessToken,
    }),
  };
  return response;
};

export { login };
