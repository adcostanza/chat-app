import { MigrationInterface, QueryRunner } from 'typeorm';

export class Messages implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`create table messages (
        id serial primary key,
        fromUser varchar(20) not null,
        toUser varchar (20) not null,
        message varchar (500) not null
    )`);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`drop table messages`);
  }
}
