"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Messages {
    async up(queryRunner) {
        await queryRunner.query(`create table messages (
        id serial primary key,
        fromUser varchar(20) not null,
        toUser varchar (20) not null,
        message varchar (500) not null
    )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`drop table messages`);
    }
}
exports.Messages = Messages;
