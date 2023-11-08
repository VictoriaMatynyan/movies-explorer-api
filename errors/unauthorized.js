const statusCodes = require('../utils/statusCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
