import { LoginBody } from "../handlers/login";
import { WriteMessageBody } from "../handlers/writeMessage";
import { Claims, HeadersWithToken } from "./claims";
import { Request } from "./lambda";

export const validateLoginBody = (request: Request<LoginBody, {}, {}>) => {
  const { body } = request;
  if (!body || !body.username) {
    throw {
      statusCode: 400,
      body: JSON.stringify({ errors: "username is a required property" })
    };
  }
  return request;
};
export const validateWriteMessageBody = (
  request: Request<WriteMessageBody, Claims, HeadersWithToken>
) => {
  const errors = [];
  const { body } = request;
  if (body == null) {
    //@ts-ignore
    body = {};
  }
  if (!body.message) {
    errors.push("message is a required property");
  }
  if (!body.toUsers || body.toUsers.length === 0) {
    errors.push("toUsers is a required property");
  }

  if (errors.length > 0) {
    throw {
      statusCode: 400,
      body: JSON.stringify({ errors })
    };
  }

  return request;
};
