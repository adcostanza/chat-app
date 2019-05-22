"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMessagesTableMigration = async (queryRunner) => {
    await queryRunner.query(`create table messages (
          id serial primary key,
          fromUser varchar(20) not null,
          toUser varchar (20) not null,
          message varchar (500) not null
      )`);
};
exports.migrations = [
    { name: 'messages', migration: createMessagesTableMigration },
];
