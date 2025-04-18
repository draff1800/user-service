import express from 'express';
import { logger } from '../../utils/logger.js';
import helmet from 'helmet';
import cors from 'cors';
import { envVariables } from '../../config/env-variables.js';
import morgan from 'morgan';

export const setupBaseMiddleware = (app: express.Application): void => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  const morganStream = {
    write: (message: string) => {
      logger.info(message.trim());
    },
  };

  if (envVariables.nodeEnv === 'production') {
    app.use(morgan('combined', { stream: morganStream }));
  } else {
    app.use(morgan('dev', { stream: morganStream }));
  }
};
