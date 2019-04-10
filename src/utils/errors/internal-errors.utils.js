module.exports.NonImplementedError = class NonImplementedError extends Error {
  constructor(message = 'This feature is not implemented.') {
    super();
    this.message = message;
    this.name = 'NOT_IMPLEMENTED';
  }
};
