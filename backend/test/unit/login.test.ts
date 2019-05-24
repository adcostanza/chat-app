import { login } from "../../src/handlers/login";
import { Context } from "aws-lambda";

test("login with a username", async () => {
  const event = {
    body: JSON.stringify({
      username: "adam"
    })
  };
  const response = await login(event, {} as Context, () => {});

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toHaveProperty("accessToken");
  console.log(response);
});
