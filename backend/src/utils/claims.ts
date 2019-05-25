import { decodeToken } from "./jwt";
import { createHandler, HandlerFn, Middleware, Request } from "./lambda";

export interface Claims {
  username: string;
}

export interface HeadersWithToken {
  token: string;
}

export const authenticateAndGetClaims = <T extends object, R>(
  props: Request<T, R, HeadersWithToken>
): Request<T, R, HeadersWithToken> => {
  const { headers } = props;
  const { token } = headers;
  if (token == null) {
    throw {
      statusCode: 500,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  try {
    return { ...props, record: decodeToken(token) };
  } catch (e) {
    throw {
      statusCode: 500,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }
};

export const createHandlerWithAuth = <T extends object>(props: {
  middleware: Middleware<T, Claims, HeadersWithToken>[];
  handlerFn: HandlerFn<T, Claims, HeadersWithToken>;
}) =>
  createHandler<T, Claims, HeadersWithToken>({
    ...props,
    initialRecord: { username: null }
  });
