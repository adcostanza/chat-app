import { Callback, Context, Handler } from 'aws-lambda';
import { postgres } from '../db/postgres';
import { authenticateAndGetClaims, Claims } from '../utils/claims';
import { Store } from '../db/store';
import { createHandler } from '../utils/lambda';

type GetMessagesProps = { record: Claims };

const getMessagesLogic = async (props: GetMessagesProps) => {
  await postgres.connect();
  const queryRunner = await postgres.getQueryRunner();
  const messages = await Store.getMessages(props.record, queryRunner);
  return {
    statusCode: 200,
    body: JSON.stringify({
      messages,
    }),
  };
};

const operations = [authenticateAndGetClaims, getMessagesLogic];

const getMessages = createHandler({ initialRecord: {}, operations });

export { getMessages };
