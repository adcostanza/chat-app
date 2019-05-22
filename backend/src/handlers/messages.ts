import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';


const get: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await postgres.connect();
  const queryRunner = await postgres.getQueryRunner();
  const res = await queryRunner.query('SELECT NOW()');
  const tables = await queryRunner.query('SELECT * FROM pg_catalog.pg_tables');
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      a: 'a',
      res,
      tables,
    }),
  };
  return response;
};

export { get };

