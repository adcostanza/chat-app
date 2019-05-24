import { decodeToken } from "./jwt";
import { LambdaEvent } from "./lambda";

export interface Claims {
  username: string;
}

export const authenticateAndGetClaims = (event: LambdaEvent): Claims => {
  const { token } = event.headers;
  if (token == null) {
    throw {
      statusCode: 500,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  try {
    return decodeToken(token);
  } catch (e) {
    throw {
      statusCode: 500,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }
};
