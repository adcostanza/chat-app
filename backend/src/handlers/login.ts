import { Callback, Context, Handler } from "aws-lambda";
import { createToken } from "../utils/jwt";
import { parseBody } from "../utils/body";
import { validateLoginBody } from "../utils/validation";

export interface LoginBody {
  username: string;
}

const login: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const body = parseBody<LoginBody>(event);
    validateLoginBody(body);

    const accessToken = createToken(body.username);
    return {
      statusCode: 200,
      body: JSON.stringify({
        accessToken
      })
    };
  } catch (e) {
    return e;
  }
};

export { login };
