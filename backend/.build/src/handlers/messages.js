"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
const get = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await postgres_1.postgres.connect();
    const queryRunner = await postgres_1.postgres.getQueryRunner();
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
