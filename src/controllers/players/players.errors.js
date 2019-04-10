module.exports.PlayerNotFound = class PlayerNotFound extends Error {
  constructor(message = 'Attempted to process a non-existing player.') {
    super();
    this.message = message;
    this.name = 'NO_PLAYER_FOUND';
  }
};
