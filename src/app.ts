import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from './utils/logger.js';
import config from './config.js';
import morgan from 'morgan';
import { authRouter } from './routers/auth-router.js';
import { userRouter } from './routers/user-router.js';
import { handleError } from './middleware/handle-error-middleware.js';

const app = express();

const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

app.use(helmet());
app.use(cors());
app.use(express.json());
if (config.nodeEnv === 'production') {
  app.use(morgan('combined', { stream: morganStream }));
} else {
  app.use(morgan('dev', { stream: morganStream }));
}

app.use('/v1/auth', authRouter);
app.use('/v1/users', userRouter);

app.use(handleError);

export default app;
