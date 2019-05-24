export interface LambdaEvent {
  body?: string;
  headers?: { token: string };
}

export interface LambdaResponse {
  statusCode: number;
  body: string;
}

export const createResponse = (
  statusCode: number,
  body: any
): LambdaResponse => {
  return {
    statusCode,
    body: JSON.stringify(body)
  };
};

