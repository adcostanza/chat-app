"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWriteMessage = (body) => {
    const errors = [];
    if (!body.message) {
        errors.push('message is a required property');
    }
    if (!body.fromUser) {
        errors.push('fromUser is a required property');
    }
    if (!body.toUsers || body.toUsers.length === 0) {
        errors.push('toUsers is a required property');
    }
    if (errors.length === 0) {
        return null;
    }
    return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
    };
};
