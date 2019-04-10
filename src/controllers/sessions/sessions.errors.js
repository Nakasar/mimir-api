module.exports.SessionNotFound = class SessionNotFound extends Error {
  constructor(message = 'Attempted to process a non-existing session.') {
    super();
    this.message = message;
    this.name = 'NO_SESSION_FOUND';
  }
};
