const LEVEL_COLORS = Object.freeze({
  'DEBUG': '\x1b[2m',
  'LOG': '\x1b[37m',
  'INFO': '\x1b[36m',
  'WARN': '\x1b[33m',
  'ERROR': '\x1b[31m',
});

class Logger {
  constructor(requestID, service) {
    this.requestID = requestID;
    this.service = service;
    this.previousServices = [null];
  }

  pushService(service) {
    this.previousServices.push(this.service);
    this.service = service;
  }

  popService() {
    this.service = this.previousServices.pop();
  }

  debug(...messages) {
    console.debug(...formatLog('DEBUG', this.requestID, this.service)(messages));
  }

  log(...messages) {
    console.log(...formatLog('LOG', this.requestID, this.service)(messages))
  }

  info(...messages) {
    console.info(...formatLog('INFO', this.requestID, this.service)(messages))
  }

  warn(...messages) {
    console.warn(...formatLog('WARN', this.requestID, this.service)(messages))
  }

  error(...messages) {
    console.error(...formatLog('ERROR', this.requestID, this.service)(messages))
  }
}

function formatLogLevel(level) {
  return `[${LEVEL_COLORS[level] || '\x1b[2m'}${level}\x1b[0m]`;
}

function formatLog(level, requestID, service) {
  return (messages) => {
    return [`${new Date().toISOString()} [${requestID}] ${service ? `[${service}] ` : ''}${formatLogLevel(level)}`, ...messages];
  };
}

function getLogger(requestID, service) {
  return new Logger(requestID, service);
}

function createLogger() {
  return (req, res, next) => {
    req.locals.logger = getLogger(req.locals.requestID, req.locals.service);

    return next();
  }
}

function logRequest() {
  return (req, res, next) => {
    req.locals.logger.log(`Incoming request on [Method=${req.method}] [Route=${req.path}].`);

    req.on('end', () => {
      const endTime = new Date().getMilliseconds();

      req.locals.logger.log(`Processed request with [Status=${res.statusCode}] in [Duration=${endTime - req.locals.startTime}ms]${req.locals.route ? ` using [Route=${req.locals.route}]` : ''}.`);
    });

    return next();
  };
}

module.exports = { createLogger, getLogger, logRequest };
