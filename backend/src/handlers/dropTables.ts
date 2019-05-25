import { postgres } from "../db/postgres";
import { Store } from "../db/store";
import {
  authenticateAndGetClaims,
  createHandlerWithAuth
} from "../utils/claims";

const dropTables = createHandlerWithAuth<{}>({
  middleware: [authenticateAndGetClaims],
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
