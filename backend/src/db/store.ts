import { QueryRunner } from "typeorm";
import { Claims } from "../utils/claims";
import { Message } from "../model/model";

export namespace Store {
  export const writeMessage = async (props: {
    fromUser: string;
    toUsers: string[];
    message: string;
    queryRunner: QueryRunner;
  }) => {
    const { fromUser, toUsers, message, queryRunner } = props;
    await queryRunner.query(
      `INSERT INTO messages (fromUser, toUsers, message) VALUES ('${fromUser}',array[${toUsers
        .map(user => `'${user}'`)
        .join(",")}],'${message}')`
    );
  };

  export const getMessages = async (
    claims: Claims,
    queryRunner: QueryRunner
  ): Promise<Message[]> => {
    return (await queryRunner.query(
      `SELECT id, message, fromUser, toUsers from messages WHERE '${
        claims.username
      }' = ANY(toUsers) OR fromUser = '${claims.username}'`
      //TODO figure out case insensitivity so we don't have to do this
    )).map(
      (row: {
        id: string;
        message: string;
        fromuser: string;
        tousers: string[];
      }) => ({
        id: row.id,
        message: row.message,
        fromUser: row.fromuser,
        toUsers: row.tousers
      })
    );
  };

  //only for dev purposes
  export const dropTables = async (queryRunner: QueryRunner) => {
    await queryRunner.query(`DROP TABLE migrations`);
    await queryRunner.query(`DROP TABLE messages`);
  };
}
