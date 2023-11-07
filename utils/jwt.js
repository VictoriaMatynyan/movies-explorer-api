// создаём токен с jsonwebtoken библиотекой;
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV, JWT_SECRET_DEV } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });

module.exports = generateToken;
