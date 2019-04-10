module.exports.InvitationNotFound = class InvitationNotFound extends Error {
  constructor(message = 'Attempted to process a non-existing invitation.') {
    super();
    this.message = message;
    this.name = 'NO_INVITATION_FOUND';
  }
};
