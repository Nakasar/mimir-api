const express = require('express');

const { HTTPErrors: { NonImplementedError } } = require("../utils/errors");

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/sessions');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      req.locals.setRoute('/sessions');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  });

router.route('/:sessionId')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/sessions/:sessionId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      req.locals.setRoute('/sessions/:sessionId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      req.locals.setRoute('/sessions/:sessionId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;

