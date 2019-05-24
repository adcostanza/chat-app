import { createToken } from '../utils/jwt';
import { createHandler } from '../utils/lambda';
import { validateLoginBody } from '../utils/validation';

export interface LoginBody {
  username: string;
}

export type LoginProps = { body: LoginBody };

const loginLogic = ({ body }: LoginProps) => {
  const accessToken = createToken(body.username);
  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken,
    }),
  };
};

const operations = [validateLoginBody, loginLogic];
const login = createHandler({ initialRecord: {}, operations });

export { login };
