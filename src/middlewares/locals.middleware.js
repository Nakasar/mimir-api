const uuidv1 = require('uuid/v1');

function createLocals() {
  return (req, res, next) => {
    const requestID = uuidv1();

    req.locals = {
      requestID,
      startTime: new Date().getMilliseconds(),
      route: null,
      setRoute: (route) => {
        req.locals.route = route;
      },
    };

    return next();
  }
}

module.exports = { createLocals };
