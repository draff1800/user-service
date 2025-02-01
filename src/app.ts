import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.js';
import authRouter from './routers/auth-router.js';
import userRouter from './routers/user-router.js';
import errorHandler from './middleware/error-handler-middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
if (config.nodeEnv === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use('/v1/auth', authRouter);
app.use('/v1/users', userRouter);

app.use(errorHandler);

export default app;
