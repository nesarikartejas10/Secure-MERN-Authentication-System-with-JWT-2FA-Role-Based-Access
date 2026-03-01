class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.stack = Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
