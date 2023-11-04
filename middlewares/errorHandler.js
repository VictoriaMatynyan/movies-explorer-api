const Statuses = require('../utils/statusCodes');
const { SERVER_ERROR_MESSAGE } = require('../utils/responseMessages');

module.exports = (err, req, res, next) => {
  res.status(err.statusCode).send({
    message: err.statusCode === Statuses.SERVER_ERROR ? SERVER_ERROR_MESSAGE : err.message,
  });
  return next();
};
