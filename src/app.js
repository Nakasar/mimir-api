const cors = require('cors');
const express = require('express');

const FirebaseService = require('./services/firebase.service');

const {authenticate} = require("./middlewares/authentication.middleware");
const { createLocals } = require('./middlewares/locals.middleware');
const { createLogger, getLogger, logRequest } = require('./middlewares/logger.middleware');

const GamesRouter = require('./routes/games.routes');
const InvitationsRouter = require('./routes/invitations.routes');
const PlayersRoutes = require('./routes/players.routes');
const SessionsRoutes = require('./routes/sessions.routes');

const app = express();

// @TODO: Set production CORS configuration.
app.use(cors());

app.use(createLocals());
app.use(createLogger());
app.use(logRequest());
app.use(authenticate());

app.use('/games', GamesRouter);
app.use('/invitations', InvitationsRouter);
app.use('/players', PlayersRoutes);
app.use('/sessions', SessionsRoutes);

app.use('*', (req, res, next) => {
  req.locals.logger.warn(`Attempting to access the non-existing [Route=${req.baseUrl}].`);

  res.status(404);

  return res.json({
    status: 404,
    name: 'ROUTE_NOT_FOUND',
    message: 'The requested route does not exist, or is hidden to the provided authenticated context.'
  });
});

app.use((err, req, res, next) => {
  try {
    if (req.locals.logger) {
      req.locals.logger.error(err);
    } else {
      const logger = getLogger(req.locals && req.locals.requestID || 'NO_REQUEST_ID', req.locals && req.locals.service);
      logger.error(err);
    }

    if (err.isHTTP) {
      res.status(err.status || 500);

      return res.json({
        status: err.status || 500,
        name: err.name || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'An error occurred and the request could not processed correctly.',
        requestID: req.locals && req.locals.requestID || 'NO_REQUEST_ID',
      });
    } else {
      res.status(500);

      return res.json({
        status: 500,
        name: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred and the request could not processed correctly.',
        requestID: req.locals && req.locals.requestID || 'NO_REQUEST_ID',
      });
    }
  } catch (error) {
    console.error(`${new Date().toISOString()} [NON_CATCHED_ERROR]`, error);

    return res.json({
      status: 500,
      name: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred and the request could not processed correctly.',
    });
  }
});

app.listen(8080, err => {
  if (err) {
    console.error(err);
    console.info(`Could not start MIMIT API.`);

    process.exit(1);
  }

  try {
    FirebaseService.init();
  } catch (err) {
    console.error(err);
    console.info('Could not init Firebase SDK.');
  }

  console.info(`[\x1b[36mINFO\x1b[0m] \x1b[32mMIMIR API running on port \x1b[36m${8080}\x1b[0m\x1b[32m.\x1b[0m`);
});
