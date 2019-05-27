import { Context, Handler } from "aws-lambda";
import { parseBody } from "./body";

export interface LambdaEvent {
  body?: string;
  headers?: { token: string };
}

export interface LambdaResponse {
  statusCode: number;
  body: string;
}

export type Request<B extends object, R, H extends object> = {
  body: B;
  record: R;
  headers: H;
};
export type Middleware<B extends object, R, H extends object> = (
  request: Request<B, R, H>
) => Request<B, R, H> | Promise<Request<B, R, H>>;

export type HandlerFn<B extends object, R, H extends object> = (
  request: Request<B, R, H>
) => LambdaResponse | Promise<LambdaResponse>;

export const createHandler = <B extends object, R, H extends object>(props: {
  middleware: Middleware<B, R, H>[];
  handlerFn: HandlerFn<B, R, H>;
  initialRecord?: R;
}): Handler => {
  const { middleware, handlerFn, initialRecord } = props;
  return async (event: any, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      let request: Request<B, R, H> = {
        body: parseBody<B>(event),
        record: initialRecord,
        headers: event.headers
      };

      for (let currentMiddleware of middleware) {
        request = await currentMiddleware(request);
      }

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
      };
      return { ...(await handlerFn(request)), headers };
    } catch (e) {
      return e;
    }
  };
};
