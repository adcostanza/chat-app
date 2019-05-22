"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
const writeMessage = async (event, context, callback) => {
    await postgres_1.postgres.connect();
    const { token } = event.headers;
    if (token == null) {
        return {
            statusCode: 500,
            body: 'Unauthorized',
        };
    }
    const body = JSON.parse(event.body);
    if (!body.message) {
        return {
            statusCode: 400,
            body: 'message is a required property',
        };
    }
    return {
        statusCode: 200,
        body: body.message
    };
};
exports.writeMessage = writeMessage;
