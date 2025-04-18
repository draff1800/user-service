import mongoose from 'mongoose';

import { envVariables } from '../config/env-variables.js';
import { logger } from '../utils/logger.js';

export const connectToDb = async (): Promise<void> => {
  const { dbUser, dbPassword, dbClusterName, dbDatabaseName } = envVariables;
  const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterName}.fszttko.mongodb.net/${dbDatabaseName}?retryWrites=true&w=majority&appName=${dbClusterName}`;

  try {
    await mongoose.connect(dbUri);
  } catch (err) {
    logger.error('Initial connection to database failed. Shutting down...', { errorMessage: (err as Error).message });
    process.exit(1);
  }
};

let shuttingDown = false;
let shutdownTimer: NodeJS.Timeout | null = null;
const RECONNECT_TIMEOUT = 30000;

mongoose.connection.on('connecting', () => {
  logger.info(`Connecting to database...`);
});

mongoose.connection.on('connected', () => {
  logger.info(`Successfully connected to database`);
});

mongoose.connection.on('disconnecting', () => {
  logger.info(`Disconnecting from database...`);
});

mongoose.connection.on('disconnected', () => {
  if (shuttingDown) {
    logger.info(`Successfully disconnected from database`);
  } else {
    logger.error('Unexpectedly disconnected from database');

    shutdownTimer = setTimeout(() => {
      logger.error('Could not reconnect to database within timeout. Shutting down...');
      process.exit(1);
    }, RECONNECT_TIMEOUT);
  }
});

mongoose.connection.on('reconnected', () => {
  logger.info(`Successfully reconnected to database`);

  if (shutdownTimer) {
    clearTimeout(shutdownTimer);
    shutdownTimer = null;
  }
});

mongoose.connection.on('error', (error) => {
  logger.error(`A database error occurred`, { errorMessage: error.message });
});

const gracefullyCloseConnection = async (nodeJsSignal: string) => {
  process.on(nodeJsSignal, async () => {
    shuttingDown = true;
    logger.info(`${nodeJsSignal} signal received. Closing database connection...`);
    try {
      await mongoose.connection.close();
      logger.info(`Gracefully closed database connection`);
      process.exit(0);
    } catch (err) {
      logger.error('Graceful close of database connection failed', { errorMessage: (err as Error).message });
      process.exit(1);
    }
  });
};

process.on('SIGINT', () => gracefullyCloseConnection('SIGINT'));
process.on('SIGTERM', () => gracefullyCloseConnection('SIGTERM'));
