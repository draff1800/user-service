import express from 'express';

import { API_VERSION } from '../../config/constants.js';
import { authRouter } from '../../routers/auth-router.js';
import { userRouter } from '../../routers/user-router.js';

export const setupRouters = (app: express.Application): void => {
  app.use(`/${API_VERSION}/auth`, authRouter);
  app.use(`/${API_VERSION}/users`, userRouter);
};
