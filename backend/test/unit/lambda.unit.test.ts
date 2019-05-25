import { createHandler, Request } from "../../src/utils/lambda";
import { Context } from "aws-lambda";

interface Body {
  count: number;
}

interface Claims {
  username: string;
}

interface Headers {
  couldBeAnyHeader: string;
}

type Req = Request<Body, Claims, Headers>;

const middleware1 = jasmine.createSpy().and.callFake((req: Req) => {
  return { ...req, body: { count: req.body.count + 1 } };
});
const middleware2 = jasmine.createSpy().and.callFake((req: Req) => {
  return {
    ...req,
    body: { count: req.body.count * 2 },
    record: { username: req.headers.couldBeAnyHeader }
  };
});
const handlerFn = jasmine.createSpy().and.callFake((req: Req) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      count: req.body.count,
      username: req.record.username
    })
  };
});
test("lambda handler ", async () => {
  const handler = createHandler<Body, Claims, Headers>({
    middleware: [middleware1, middleware2],
    handlerFn,
    initialRecord: { username: null }
  });
  const event = {
    body: JSON.stringify({
      count: 5
    }),
    headers: {
      couldBeAnyHeader: "adam"
    }
  };
  const response = await handler(event, {} as Context, () => {});

  expect(response).toMatchObject({
    statusCode: 200,
    body: '{"count":12,"username":"adam"}'
  });
  expect(middleware1).toBeCalledTimes(1);
  expect(middleware2).toBeCalledTimes(1);
  expect(handlerFn).toBeCalledTimes(1);
});
