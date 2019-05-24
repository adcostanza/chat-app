import { Callback, Context, Handler } from "aws-lambda";
import { postgres } from "../db/postgres";
import { Message } from "../model/model";
import { decodeToken } from "../utils/jwt";
import { validateWriteMessageBody } from "../utils/validation";
import { Store } from "../db/store";
import { parseBody } from "../utils/body";
import { authenticateAndGetClaims } from "../utils/claims";
import { createResponse, LambdaResponse } from "../utils/lambda";

export type WriteMessageBody = Exclude<Exclude<Message, "id">, "fromUser">;

const writeMessage: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { username } = authenticateAndGetClaims(event);

    const body = parseBody<WriteMessageBody>(event);
    validateWriteMessageBody(body);

    await postgres.connect();
    const { toUsers, message } = body;
    const queryRunner = await postgres.getQueryRunner();
    await Store.writeMessage({
      fromUser: username,
      toUsers,
      message,
      queryRunner
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (e) {
    return e;
  }
};

export { writeMessage };
