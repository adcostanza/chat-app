"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
const drop_1 = require("../db/drop");
const dropTables = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await postgres_1.postgres.connect();
    const queryRunner = await postgres_1.postgres.getQueryRunner();
    await drop_1.drop(queryRunner);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            complete: true,
        }),
    };
    return response;
};
exports.dropTables = dropTables;
