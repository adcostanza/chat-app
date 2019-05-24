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

export type OperationProps<B extends object, R, H> = { body?: B; record?: R; headers?: H };
export type Operation<B extends object, R, H> = (
  props: OperationProps<B, R, H>
) =>
  | OperationProps<B, R, H>
  | LambdaResponse
  | Promise<OperationProps<B, R, H>>
  | Promise<LambdaResponse>;
export const createHandler = <B extends object, R, H>(props: {
  operations: Operation<B, R, H>[];
  initialRecord?: R;
}): Handler => {
  const { operations, initialRecord } = props;
  return async (event: any, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      let body: B;
      if (event.body != null) {
        body = parseBody<B>(event);
      }
      let record = initialRecord;
      let { headers } = event;
      for (let operation of operations) {
        const result = await operation({ body, record, headers });
        if (isLambdaResponse(result)) {
          return result;
        }
        body = result.body;
        record = result.record;
        headers = result.headers;
      }
    } catch (e) {
      return e;
    }
  };
};

function isLambdaResponse(obj: any): obj is LambdaResponse {
  return obj.statusCode !== undefined;
}
