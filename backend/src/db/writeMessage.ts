import { QueryRunner } from 'typeorm';

export const writeMessageStore = async (props: {
  fromUser: string;
  toUsers: string[];
  message: string;
  queryRunner: QueryRunner;
}) => {
  const { fromUser, toUsers, message, queryRunner } = props;
  await queryRunner.query(
    `INSERT INTO messages (fromUser, toUsers, message) VALUES ('${fromUser}',array[${toUsers
      .map(user => `'${user}'`)
      .join(',')}],'${message}')`
  );
};
