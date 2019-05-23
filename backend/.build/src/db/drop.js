"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop = async (queryRunner) => {
    await queryRunner.query(`DROP TABLE migrations`);
    await queryRunner.query(`DROP TABLE messages`);
};
