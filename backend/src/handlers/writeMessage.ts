import { postgres } from '../db/postgres';
import { Store } from '../db/store';
import { Message } from '../model/model';
import { authenticateAndGetClaims, Claims } from '../utils/claims';
import { createHandler } from '../utils/lambda';
import { validateWriteMessageBody } from '../utils/validation';

export type WriteMessageBody = Exclude<Exclude<Message, 'id'>, 'fromUser'>;

export type WriteMessageProps = { body: WriteMessageBody; record: Claims };

const writeMessageLogic = async (props: WriteMessageProps) => {
  await postgres.connect();
  const { body, record } = props;
  const { username } = record;
  const { toUsers, message } = body;
  const queryRunner = await postgres.getQueryRunner();
  await Store.writeMessage({
    fromUser: username,
    toUsers,
    message,
    queryRunner,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

const operations = [
  authenticateAndGetClaims,
  validateWriteMessageBody,
  writeMessageLogic,
];

const writeMessage = createHandler({ initialRecord: {}, operations });

export { writeMessage };
