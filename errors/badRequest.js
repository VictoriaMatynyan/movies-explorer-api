const statusCodes = require('../utils/statusCodes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
