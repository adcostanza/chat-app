import { postgres } from "../db/postgres";
import {
  authenticateAndGetClaims,
  createHandlerWithAuth
} from "../utils/claims";
import { Store } from "../db/store";

const middleware = [authenticateAndGetClaims];

const getMessages = createHandlerWithAuth<{}>({
  middleware,
  handlerFn: async request => {
    await postgres.connect();
    const queryRunner = await postgres.getQueryRunner();
    const messages = await Store.getMessages(request.record, queryRunner);
    return {
      statusCode: 200,
      body: JSON.stringify({
        messages
      })
    };
  }
});

export { getMessages };
