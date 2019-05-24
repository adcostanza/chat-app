import { login } from "../../src/handlers/login";
import { Context } from "aws-lambda";
import { getMessages } from "../../src/handlers/getMessages";
import * as postgres from "../../src/db/postgres";
import { Message } from "../../src/model/model";

const createQueryResult = <T>(result: T) => {
  //@ts-ignore
  postgres.postgres = {
    connect: () => {
    },
    getQueryRunner: () => {
      return {
        query: () => {
          return result;
        }
      };
    }
  };
};
test("getMessages", async () => {
  const message = { message: "hello!", fromUser: "adam", toUsers: ["john"] };
  //todo fix this, postgresql is returning lower case column names
  const messageSQL = { message: "hello!", fromuser: "adam", tousers: ["john"] };
  createQueryResult([
    messageSQL
  ]);
  const event: { body: string; headers?: { token: string } } = {
    body: JSON.stringify({
      username: "adam"
    })
  };
  const response = await login(event, {} as Context, () => {
  });
  const token = JSON.parse(response.body).accessToken;

  event.headers = { token };
  const result = await getMessages(event, {} as Context, () => {
  });
  const { messages }: { messages: Message[] } = JSON.parse(result.body);
  expect(messages.length).toBe(1);
  expect(messages[0]).toMatchObject(message);
});
