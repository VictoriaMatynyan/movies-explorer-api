// создаём токен с jsonwebtoken библиотекой;
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

module.exports = generateToken;
