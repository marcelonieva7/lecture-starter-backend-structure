class ServerError extends Error {
  statusCode = 500;
  constructor(message, statusCode) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

module.exports = { ServerError };
