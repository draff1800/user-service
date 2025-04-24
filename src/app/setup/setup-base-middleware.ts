import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { envVariables } from '../../config/env-variables/env-variables.js';
import { logger } from '../../utils/logger.js';

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
