import { login } from "../src/handlers/login";
import { Context } from "aws-lambda";
import { getMessages } from "../src/handlers/getMessages";
import { Message } from "../src/model/model";
import { writeMessage } from "../src/handlers/writeMessage";

interface LambdaEvent {
  body?: string;
  headers?: { token: string };
}

test("crud around messages", async () => {
  process.env = {
    PGUSER: "postgres",
    PGDATABASE: "postgres",
    PGPASSWORD: "password",
    PGHOST: "localhost",
    PGPORT: "5432"
  };
  const message = { message: "hello!", fromUser: "adam", toUsers: ["john"] };
  const event: LambdaEvent = {
    body: JSON.stringify({
      username: "adam"
    })
  };

  const response = await login(event, {} as Context, () => {
  });
  const token = JSON.parse(response.body).accessToken;

  const messageEvent = {
    body: JSON.stringify(message),
    headers: { token }
  };

  await writeMessage(messageEvent, {} as Context, () => {
  });

  const responseJohn = await login(
    {
      body: JSON.stringify({
        username: "john"
      })
    },
    {} as Context,
    () => {
    }
  );
  const tokenJohn = JSON.parse(responseJohn.body).accessToken;

  const result = await getMessages({ headers: { token: tokenJohn } }, {} as Context, () => {
  });
  const { messages }: { messages: Message[] } = JSON.parse(result.body);
  expect(messages[0]).toMatchObject(message);
});
