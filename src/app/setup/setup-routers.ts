import express from 'express';
import { authRouter } from '../../routers/auth-router.js';
import { userRouter } from '../../routers/user-router.js';

export const setupRouters = (app: express.Application) => {
  app.use('/v1/auth', authRouter);
  app.use('/v1/users', userRouter);
};
