import cookieParser from 'cookie-parser';
import debug from 'debug';
import type { Express, Request, Response } from 'express';
import express from 'express';
import sanitizeMongo from 'express-mongo-sanitize';
import mongoose, { connect } from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';

import {
  COOKIE_SECRET,
  DB_CREDITS,
  DB_HOST, DB_PASS,
  PORT,
} from './config/env.config';
import { loggerMiddleware } from './config/logger.config';
import routes from './routes/routes';
import { convertToApiError } from './utils/middleware/middleware';
import jwtStrategy from './utils/passport';

const dbDebug = debug('db');
const appDebug = debug('app');
const app: Express = express();

(async () => {
  const connectionString = `mongodb+srv://${DB_HOST}:${DB_PASS}@${DB_CREDITS}`;
  dbDebug(`Connecting to MongoDB... ${DB_CREDITS}`);
  try {
    await connect(connectionString);
    // Handle successful connection
    dbDebug('MongoDB connection approved');

    // Handle connection error
    mongoose.connection.on('error', (err) => dbDebug('MongoDB connection error', err));

    // Handle disconnection
    mongoose.connection.on('disconnected', () => dbDebug('MongoDB disconnected'));

  } catch (error: unknown) {
    const errMsg = `Mongo DB connection error has occurred: ${
      error instanceof Error ? error.message : ''
    }`;
    throw new Error(errMsg);
  }
})().catch((error: unknown) => {
  const errMsg = `Mongo DB connection error has occurred: ${error instanceof Error ? error.message : ''}`;
  throw new Error(errMsg);
});

app.use(express.json());
app.use(sanitizeMongo());
// Authentication middleware
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(cookieParser(COOKIE_SECRET));
// Request loggers
app.use(morgan('dev'));
app.use(loggerMiddleware);

// Main route
app.route('/').get((_req: Request, res: Response) => {
  res.status(200).send('<h1>Typescript server!</h1>');
});

// Mount API routes
app.use('/api', routes);
// Error handling middleware
app.use(convertToApiError);

app.listen(PORT, () => {
  appDebug(`⚡️[server] server is running at http://localhost:${PORT}`);
});

