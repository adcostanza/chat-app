import { postgres } from "../db/postgres";
import { Store } from "../db/store";
import {
  authenticateAndGetClaims,
  createHandlerWithAuth
} from "../utils/claims";
import { validateWriteMessageBody } from "../utils/validation";

export type WriteMessageBody = { toUsers: string[]; message: string };

const writeMessage = createHandlerWithAuth<WriteMessageBody>({
  middleware: [authenticateAndGetClaims, validateWriteMessageBody],
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
