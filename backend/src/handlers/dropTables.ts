import { Callback, Context, Handler } from "aws-lambda";
import { postgres } from "../db/postgres";
import { Store } from "../db/store";
import { authenticateAndGetClaims } from "../utils/claims";

const dropTables: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    authenticateAndGetClaims(event);

    await postgres.connect();
    const queryRunner = await postgres.getQueryRunner();
    await Store.dropTables(queryRunner);
    return {
      statusCode: 200,
      body: JSON.stringify({
        complete: true
      })
    };
  } catch (e) {
    return e;
  }
};

export { dropTables };
