import { postgres } from "../db/postgres";
import { Store } from "../db/store";
import {
  authenticateAndGetClaims,
  Claims,
  createHandlerWithAuth,
  HeadersWithToken
} from "../utils/claims";
import { Middleware } from "../utils/lambda";
import { validateWriteMessageBody } from "../utils/validation";

export type WriteMessageBody = { toUsers: string[]; message: string };

const middleware: Middleware<WriteMessageBody, Claims, HeadersWithToken>[] = [
  authenticateAndGetClaims,
  validateWriteMessageBody
];

const writeMessage = createHandlerWithAuth<WriteMessageBody>({
  middleware,
  handlerFn: async request => {
    await postgres.connect();
    const { body, record } = request;
    const { username } = record;
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
  }
});

export { writeMessage };
