import express from 'express';

import { NODE_ENVS } from '../config/constants.js';
import { envVariables } from '../config/env-variables/env-variables.js';
import { setupBaseMiddleware } from './setup/setup-base-middleware.js';
import { setupErrorHandling } from './setup/setup-error-handling.js';
import { setupRouters } from './setup/setup-routers.js';
import { setupSwagger } from './setup/setup-swagger.js';

const app = express();

const isDev = envVariables.nodeEnv === NODE_ENVS.DEVELOPMENT;

setupBaseMiddleware(app);
if (isDev) setupSwagger(app);
setupRouters(app);
setupErrorHandling(app);

export default app;
