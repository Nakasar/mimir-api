module.exports.GameNotFound = class GameNotFound extends Error {
  constructor(message = 'Attempted to process a non-existing game.') {
    super();
    this.message = message;
    this.name = 'NO_GAME_FOUND';
  }
};
