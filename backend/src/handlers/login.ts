import { createToken } from "../utils/jwt";
import { createHandler } from "../utils/lambda";
import { validateLoginBody } from "../utils/validation";

export interface LoginBody {
  username: string;
}
const login = createHandler<LoginBody, {}, {}>({
  middleware: [validateLoginBody],
  handlerFn: request => {
    const accessToken = createToken(request.body.username);
    return {
      statusCode: 200,
      body: JSON.stringify({
        accessToken
      })
    };
  }
});

export { login };
