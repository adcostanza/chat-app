import { QueryRunner } from 'typeorm';

export const drop = async (queryRunner: QueryRunner) => {
  await queryRunner.query(`DROP TABLE migrations`);
  await queryRunner.query(`DROP TABLE messages`);
};
