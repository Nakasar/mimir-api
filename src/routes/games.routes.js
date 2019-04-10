const express = require('express');

const { HTTPErrors, InternalErrors } = require("../utils/errors");

const GamesController = require('../controllers/games/games.controller');
const GamesErrors = require('../controllers/games/games.errors');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/games');

      const games = await GamesController.listGames();

      return res.json(games);
    } catch (err) {
      if (err instanceof InternalErrors.NonImplementedError) {
        return next(new HTTPErrors.NonImplementedError());
      }

      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      req.locals.setRoute('/games');

      const game = await GamesController.createGame();

      res.set('Location', game.id);
      return res.sendStatus(201);
    } catch (err) {
      if (err instanceof InternalErrors.NonImplementedError) {
        return next(new HTTPErrors.NonImplementedError());
      }

      return next(err);
    }
  });

router.route('/:gameId')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/games/:gameId');

      const game = await GamesController.getGame();

      return res.json(game);
    } catch (err) {
      if (err instanceof InternalErrors.NonImplementedError) {
        return next(new HTTPErrors.NonImplementedError());
      }
      if (err instanceof GamesErrors.GameNotFound) {
        return next(new HTTPErrors.ResourceNotFoundError('The requested game does not exist.'));
      }

      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      req.locals.setRoute('/games/:gameId');

      await GamesController.updateGame();

      return res.sendStatus(204);
    } catch (err) {
      if (err instanceof InternalErrors.NonImplementedError) {
        return next(new HTTPErrors.NonImplementedError());
      }

      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      req.locals.setRoute('/games/:gameId');

      await GamesController.deleteGame();

      return res.sendStatus(204);
    } catch (err) {
      if (err instanceof InternalErrors.NonImplementedError) {
        return next(new HTTPErrors.NonImplementedError());
      }

      return next(err);
    }
  });

module.exports = router;

