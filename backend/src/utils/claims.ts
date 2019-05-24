import { decodeToken } from "./jwt";
import { OperationProps } from "./lambda";

export interface Claims {
  username: string;
}

interface HeadersWithToken {
  token: string;
}

export const authenticateAndGetClaims = <T extends object, R>(
  props: OperationProps<T, R, HeadersWithToken>
): OperationProps<T, R, HeadersWithToken> => {
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
