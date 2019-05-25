import {
  Connection,
  createConnection,
  getConnectionManager,
  QueryRunner
} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ENV } from "../utils/env";
import { runMigrations } from "../migration/migrationRunner";
import { migrations } from "../migration/migrations";

const config: PostgresConnectionOptions = {
  name: "postgres",
  type: "postgres",
  host: ENV.PGHOST,
  port: parseInt(ENV.PGPORT),
  username: ENV.PGUSER,
  password: ENV.PGPASSWORD,
  database: ENV.PGDATABASE
};

const postgresConnection = () => {
  let conn: Connection;
  let queryRunner: QueryRunner;
  let migrationsRan: boolean = false;
  const connect = async () => {
    if (conn == null || !conn.isConnected) {
      const manager = await getConnectionManager();
      if (manager.connections.length === 0) {
        conn = await createConnection(config);
      } else {
        //grab first connection
        conn = manager.connections[0];
      }

      queryRunner = conn.createQueryRunner();

      if (!migrationsRan) {
        await runMigrations(queryRunner, ...migrations);
        migrationsRan = true;
      }
    }
  };

  const getQueryRunner = async () => {
    if (queryRunner == null) {
      await connect();
    }
    return queryRunner;
  };
  const close = async () => {
    if (conn) {
      await conn.close();
    }
  };
  return {
    getQueryRunner,
    connect,
    close
  };
};

export const postgres = postgresConnection();
