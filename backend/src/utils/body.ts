import { LambdaEvent } from "./lambda";

export const parseBody = <T>(event: LambdaEvent): T => {
  try {
    return JSON.parse(event.body);
  } catch (e) {
    throw JSON.stringify({
      statusCode: 400,
      body: JSON.stringify({ error: "invalid JSON" })
    });
  }
};
