const FirebaseService = require('../services/firebase.service');

function getTokenInHeaders(headers) {
  const authorizationHeader = headers['Authorization'];

  if (!authorizationHeader || authorizationHeader.length === 0) {
    return null;
  }

  return authorizationHeader.startsWith('Bearer') ? token.split('Bearer ')[1] : token;
}

async function decodeToken(token) {
  return FirebaseService.verifyToken(token);
}

function authenticate() {
  return async (req, res, next) => {
    try {
      req.locals.logger.pushService('authentication');

      const token = getTokenInHeaders(req.headers);

      if (!token) {
        req.locals.authentication = null;

        req.locals.logger.popService();
        return next();
      }

      try {
        const decoded = await decodeToken(token);

        req.locals.authentication = {
          isValid: true,
          data: decoded,
        };

        req.locals.logger.debug('Request successfully authenticated.');

        req.locals.logger.popService();
        return next();
      } catch (err) {
        req.locals.logger.warn('An invalid authentication attempted to be validated. The headers are printed in log for security audit:', err);
        req.locals.logger.log(req.headers);

        req.locals.authentication = {
          isValid: false,
          reason: 'Verification of token has failed with an error.',
        };

        req.locals.logger.popService();
        return next();
      }
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = { authenticate };
