import { Context, Handler } from 'aws-lambda';
import { parseBody } from './body';
export interface LambdaEvent {
  body?: string;
  headers?: { token: string };
}

export interface LambdaResponse {
  statusCode: number;
  body: string;
}

export const createResponse = (statusCode: number, body: any): LambdaResponse => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export type OperationProps<B, R> = { body: B; record?: R };
export type Operation<B, R> = (
  props: OperationProps<B, R>
) => OperationProps<B, R> | LambdaResponse;
export const createHandler = <B, R>(props: {
  operations: Operation<B, R>[];
  initialRecord?: R;
}): Handler => {
  const { operations, initialRecord } = props;
  return async (event: any, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      return operations.reduce(
        ({ body, record }, operation) => {
          return operation({ body, record });
        },
        { body: parseBody<B>(event), record: initialRecord }
      );
    } catch (e) {
      return e;
    }
  };
};
