import type { Request } from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({ level: 'info' });
const customLogger = pino();

const errorLogger = customLogger.child({
  level: 'error',
});
const infoLogger = customLogger.child({
  level: 'info',
});

const loggerMiddleware = pinoHttp({
  logger,
  autoLogging: false,

  serializers: {
    req(req: Request<unknown, unknown, unknown>) {
      return {
        query: req.query,
        hostName: req.headers.host,
        connection: req.headers.connection,
        authorization: req.headers.authorization,
      };
    },
  },
});

export {
  errorLogger,
  infoLogger,
  loggerMiddleware,
};

