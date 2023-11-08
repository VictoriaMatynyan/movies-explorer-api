// создаём токен с jsonwebtoken библиотекой;
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const { JWT_SECRET_DEV } = require('./env.config');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });

module.exports = generateToken;
