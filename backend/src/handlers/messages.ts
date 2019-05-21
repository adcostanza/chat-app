import { Callback, Context, Handler } from 'aws-lambda';
const { Client } = require('pg');

interface HelloResponse {
  statusCode: number;
  body: string;
}

const get: Handler = async (event: any, context: Context, callback: Callback) => {
  const client = new Client();
  await client.connect();
  const res = await client.query('SELECT NOW()');
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: res,
    }),
  };

  callback(undefined, response);
};

export { get };
