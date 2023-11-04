const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/responseMessages');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  let payload;
  try {
    const { cookies } = req;
    if ((cookies && cookies.jwt)) {
      const token = cookies.jwt;
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
      req.user = payload;
      next();
    } else {
      next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
    }
  } catch (error) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }
};

// на случай, если нужно будет откатиться на хранение токена в headers:
// module.exports = (req, res, next) => {
//   let payload;
//   try {
//     const { authorization } = req.headers;
//     if ((authorization && authorization.startsWith('Bearer '))) {
//       const token = authorization.replace('Bearer ', '');
//       payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//       req.user = payload;
//       next();
//     } else {
//       next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
//     }
//   } catch (error) {
//     next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
//   }
// };
