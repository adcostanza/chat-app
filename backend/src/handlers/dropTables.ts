import { postgres } from "../db/postgres";
import { Store } from "../db/store";
import { authenticateAndGetClaims } from "../utils/claims";
import { createHandler } from "../utils/lambda";

const middleware = [authenticateAndGetClaims];

const dropTables = createHandler({
  middleware,
  handlerFn: async () => {
    await postgres.connect();
    const queryRunner = await postgres.getQueryRunner();
    await Store.dropTables(queryRunner);
    return {
      statusCode: 200,
      body: JSON.stringify({
        complete: true
      })
    };
  }
});

export { dropTables };
