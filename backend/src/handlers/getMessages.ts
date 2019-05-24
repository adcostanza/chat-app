import { Callback, Context, Handler } from "aws-lambda";
import { postgres } from "../db/postgres";
import { Message } from "../model/model";
import { decodeToken } from "../utils/jwt";

const getMessages: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  //TODO put into a middleware
  const { token } = event.headers;
  if (token == null) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  let claims;
  try {
    claims = decodeToken(token);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }

  await postgres.connect();
  const queryRunner = await postgres.getQueryRunner();
  const messages = (await queryRunner.query(
    `SELECT message, fromUser, toUsers from messages WHERE '${claims.username}' = ANY(toUsers)`
  )) as Exclude<Message, "id">[];
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      messages
    })
  };
  return response;
};

export { getMessages };
