import { postgres } from "../db/postgres";
import {
  authenticateAndGetClaims,
  Claims,
  HeadersWithToken
} from "../utils/claims";
import { Store } from "../db/store";
import { createHandler } from "../utils/lambda";

const middleware = [authenticateAndGetClaims];

const getMessages = createHandler<{}, Claims, HeadersWithToken>({
  initialRecord: { username: null },
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
