const { InternalErrors: { NonImplementedError } } = require('../../utils/errors');

const { GameNotFound } = require('./games.errors');

async function createGame() {
  throw new NonImplementedError();

  return {};
}

async function deleteGame() {
  throw new NonImplementedError();

  return null;
}

async function getGame() {
  throw new NonImplementedError();

  return {};
}

async function listGames() {
  throw new NonImplementedError();

  return [];
}

async function updateGame() {
  throw new NonImplementedError();

  return null;
}

module.exports = {
  createGame,
  deleteGame,
  getGame,
  listGames,
  updateGame,
};
