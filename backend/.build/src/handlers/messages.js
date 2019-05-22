"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const env_1 = require("../env");
const migrationRunner_1 = require("../migration/migrationRunner");
const migrations_1 = require("../migration/migrations");
const config = {
    name: 'postgres',
    type: 'postgres',
    host: env_1.ENV.PGHOST,
    port: parseInt(env_1.ENV.PGPORT),
    username: env_1.ENV.PGUSER,
    password: env_1.ENV.PGPASSWORD,
    database: env_1.ENV.PGDATABASE,
};
const postgresConnection = () => {
    let conn;
    let queryRunner;
    let migrationsRan = false;
    const connect = async () => {
        if (conn == null || !conn.isConnected) {
            const manager = await typeorm_1.getConnectionManager();
            if (manager.connections.length === 0) {
                conn = await typeorm_2.createConnection(config);
            }
            else {
                //grab first connection
                conn = manager.connections[0];
            }
            queryRunner = conn.createQueryRunner();
            if (!migrationsRan) {
                await migrationRunner_1.runMigrations(queryRunner, ...migrations_1.migrations);
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
            conn.close();
        }
    };
    return {
        getQueryRunner,
        connect,
        close,
    };
};
const postgres = postgresConnection();
const get = async (event, context, callback) => {
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
exports.get = get;
