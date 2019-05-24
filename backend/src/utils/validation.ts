import { Message } from "../model/model";
import { LoginBody } from "../handlers/login";

export const validateLoginBody = (body: LoginBody) => {
  if (!body || !body.username) {
    throw {
      statusCode: 400,
      body: JSON.stringify({ errors: "username is a required property" })
    };
  }
};
export const validateWriteMessageBody = (body: Message) => {
  const errors = [];
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
};
