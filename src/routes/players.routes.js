const express = require('express');

const { HTTPErrors: { NonImplementedError } } = require("../utils/errors");

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/players');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      req.locals.setRoute('/players');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  });

router.route('/:playerId')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/players/:playerId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      req.locals.setRoute('/players/:playerId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  });

router.route('/:playerId/archive-status')
  .put(async (req, res, next) => {
    try {
      req.locals.setRoute('/players/:playerId/archive-status');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
