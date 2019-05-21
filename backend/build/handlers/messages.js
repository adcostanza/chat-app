"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const env_1 = require("../env");
const config = {
    name: 'postgres',
    type: 'postgres',
    host: env_1.ENV.PGHOST,
    port: parseInt(env_1.ENV.PGPORT),
    username: env_1.ENV.PGUSER,
    password: env_1.ENV.PGPASSWORD,
    database: env_1.ENV.PGDATABASE,
    migrations: ['src/migration/**/*.ts'],
};
const get = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let conn;
    try {
        conn = await typeorm_1.createConnection(config);
        await conn.runMigrations();
        const queryRunner = conn.createQueryRunner();
        const res = await queryRunner.query('SELECT NOW()');
        // const tables = await queryRunner.query('SELECT * FROM pg_catalog.pg_tables');
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                a: 'a',
                res,
                // tables,
                ENV: env_1.ENV
            }),
        };
        // await conn.close();
        console.log(env_1.ENV);
        return response;
    }
    catch (e) {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                error: e.message,
            }),
        };
        // await conn.close();
        console.log(env_1.ENV);
        return response;
    }
};
exports.get = get;
