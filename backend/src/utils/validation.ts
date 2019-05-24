import { LoginProps } from '../handlers/login';
import { WriteMessageProps } from '../handlers/writeMessage';

export const validateLoginBody = (props: LoginProps) => {
  const { body } = props;
  if (!body || !body.username) {
    throw {
      statusCode: 400,
      body: JSON.stringify({ errors: 'username is a required property' }),
    };
  }
  return props;
};
export const validateWriteMessageBody = (props: WriteMessageProps) => {
  const errors = [];
  const { body } = props;
  if (body == null) {
    //@ts-ignore
    body = {};
  }
  if (!body.message) {
    errors.push('message is a required property');
  }
  if (!body.toUsers || body.toUsers.length === 0) {
    errors.push('toUsers is a required property');
  }

  if (errors.length > 0) {
    throw {
      statusCode: 400,
      body: JSON.stringify({ errors }),
    };
  }

  return props;
};
