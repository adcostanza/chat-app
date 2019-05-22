
import { QueryRunner } from 'typeorm';
import { Migration } from './migrationRunner';

const createMessagesTableMigration = async (queryRunner: QueryRunner) => {
  await queryRunner.query(`create table messages (
          id serial primary key,
          fromUser varchar(20) not null,
          toUser varchar (20) not null,
          message varchar (500) not null
      )`);
};

export const migrations: Migration[] = [
  { name: 'messages', migration: createMessagesTableMigration },
];
