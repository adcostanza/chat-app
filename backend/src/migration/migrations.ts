
import { QueryRunner } from 'typeorm';
import { Migration } from './migrationRunner';

const createMessagesTableMigration = async (queryRunner: QueryRunner) => {
  await queryRunner.query(`create table messages (
          id serial primary key,
          fromUser text not null,
          toUsers text[] not null,
          message text not null
      )`);
};

export const migrations: Migration[] = [
  { name: 'messages', migration: createMessagesTableMigration },
];
