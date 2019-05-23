import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';
import { Message } from '../model/model';
import { ENV } from '../env';

const get: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(ENV);
  await postgres.connect();
  const queryRunner = await postgres.getQueryRunner();
  const messages = (await queryRunner.query('SELECT * from messages')) as Message[];
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      messages,
    }),
  };
  return response;
};

export { get };
