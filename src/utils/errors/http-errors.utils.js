module.exports.NonImplementedError = class NonImplementedError extends Error {
  constructor(message = 'This route or feature is not implemented.') {
    super();
    this.message = message;
    this.status = 501;
    this.name = 'NOT_IMPLEMENTED';
    this.isHTTP = true;
  }
};

module.exports.ResourceNotFoundError = class ResourceNotFoundError extends Error {
  constructor(message = 'This resource could not be found, or is hidden to the provided authentication.') {
    super();
    this.message = message;
    this.status = 404;
    this.name = 'NOT_FOUND';
    this.isHTTP = true;
  }
};
