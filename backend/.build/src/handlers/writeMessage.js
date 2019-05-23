"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../db/postgres");
const validation_1 = require("./validation");
const writeMessage_1 = require("../db/writeMessage");
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
    const errors = validation_1.validateWriteMessage(body);
    if (errors != null) {
        return errors;
    }
    const { fromUser, toUsers, message } = body;
    const queryRunner = await postgres_1.postgres.getQueryRunner();
    writeMessage_1.writeMessageStore({ fromUser, toUsers, message, queryRunner });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: body.message }),
    };
};
exports.writeMessage = writeMessage;
