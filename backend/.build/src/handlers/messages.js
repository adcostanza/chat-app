"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
const get = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await postgres_1.postgres.connect();
    const queryRunner = await postgres_1.postgres.getQueryRunner();
    const messages = (await queryRunner.query('SELECT * from messages'));
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            messages,
        }),
    };
    return response;
};
exports.get = get;
