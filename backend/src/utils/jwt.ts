const jwt = require('jsonwebtoken');
const SECRET = 'dont tell anyone!';

export const createToken = (username: string) => {
  return jwt.sign({ username }, SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, SECRET);
};