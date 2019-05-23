import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';
import { Message } from '../model/model';
import { drop } from '../db/drop';

const dropTables: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await postgres.connect();
  const queryRunner = await postgres.getQueryRunner();
  await drop(queryRunner);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      complete: true,
    }),
  };
  return response;
};

export { dropTables };
