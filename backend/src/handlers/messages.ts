import { Callback, Context, Handler } from 'aws-lambda';
import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ENV } from '../env';

const config: PostgresConnectionOptions = {
  name: 'postgres',
  type: 'postgres',
  host: ENV.PGHOST,
  port: parseInt(ENV.PGPORT),
  username: ENV.PGUSER,
  password: ENV.PGPASSWORD,
  database: ENV.PGDATABASE,
  migrations: ['src/migration/**/*.ts'],
};

const get: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let conn: Connection;
    conn = await createConnection(config);
    await conn.runMigrations();
    const queryRunner = conn.createQueryRunner();
    const res = await queryRunner.query('SELECT NOW()');
    const tables = await queryRunner.query('SELECT * FROM pg_catalog.pg_tables');
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        a: 'a',
        res,
        tables
      })
    };
    // await conn.close();
    console.log(tables);
    return response;
};

export { get };
