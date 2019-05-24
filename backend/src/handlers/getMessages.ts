import { Callback, Context, Handler } from "aws-lambda";
import { postgres } from "../db/postgres";
import { authenticateAndGetClaims } from "../utils/claims";
import { Store } from "../db/store";

const getMessages: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const claims = authenticateAndGetClaims(event);

    await postgres.connect();
    const queryRunner = await postgres.getQueryRunner();
    const messages = await Store.getMessages(claims, queryRunner);
    return {
      statusCode: 200,
      body: JSON.stringify({
        messages
      })
    };
  } catch (e) {
    return e;
  }
};

export { getMessages };
