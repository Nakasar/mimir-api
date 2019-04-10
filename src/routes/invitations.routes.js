const express = require('express');

const { HTTPErrors: { NonImplementedError } } = require("../utils/errors");

const router = express.Router({ mergeParams: true });

router.route('/:invitationId')
  .get(async (req, res, next) => {
    try {
      req.locals.setRoute('/invitations/:invitationId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      req.locals.setRoute('/invitations/:invitationId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      req.locals.setRoute('/invitations/:invitationId');

      throw new NonImplementedError();
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
