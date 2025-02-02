import express from 'express';
import { logger } from '../../utils/logger.js';
import helmet from 'helmet';
import cors from 'cors';
import config from '../../config.js';
import morgan from 'morgan';

export const setupMiddleware = (app: express.Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  const morganStream = {
    write: (message: string) => {
      logger.info(message.trim());
    },
  };

  if (config.nodeEnv === 'production') {
    app.use(morgan('combined', { stream: morganStream }));
  } else {
    app.use(morgan('dev', { stream: morganStream }));
  }
};
