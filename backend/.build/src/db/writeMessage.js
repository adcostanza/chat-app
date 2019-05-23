"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMessageStore = async (props) => {
    const { fromUser, toUsers, message, queryRunner } = props;
    await queryRunner.query(`INSERT INTO messages (fromUser, toUsers, message) VALUES ('${fromUser}',array[${toUsers
        .map(user => `'${user}'`)
        .join(',')}],'${message}')`);
};
