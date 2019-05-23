"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMessagesTableMigration = async (queryRunner) => {
    await queryRunner.query(`create table messages (
          id serial primary key,
          fromUser text not null,
          toUsers text[] not null,
          message text not null
      )`);
};
exports.migrations = [
    { name: 'messages', migration: createMessagesTableMigration },
];
