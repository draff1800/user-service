import { envVariables } from '../config.js';
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectToDb = async () => {
  try {
    const { dbHost, dbPort, dbName } = envVariables;
    await mongoose.connect(`${dbHost}:${dbPort}/${dbName}`);
    logger.info(`Connected to database`);
  } catch (error) {
    logger.error('Database connection failed:', {
      errorMessage: (error as Error).message,
    });

    process.exit(1);
  }
};
