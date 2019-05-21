import { Callback, Context, Handler } from 'aws-lambda';
import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ENV } from '../env';
const { Client } = require('pg');

var conString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${
  process.env.PGHOST
}:5432/${process.env.PGDATABASE}`;

const config: PostgresConnectionOptions = {
  name: 'postgres',
  type: 'postgres',
  host: ENV.PGHOST,
  port: parseInt(ENV.PGPORT),
  username: ENV.PGUSER,
  password: ENV.PGPASSWORD,
  database: ENV.PGDATABASE,
  migrations: ['src/migration'],
};

const get: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let conn: Connection;
  try {
    const conn = await createConnection(config);
    await conn.runMigrations();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        a: 'a',
      }),
    };
    await conn.close();
    callback(undefined, response);
  } catch (e) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        error: e.message,
      }),
    };
    await conn.close();
    callback(undefined, response);
  }
};

export { get };
