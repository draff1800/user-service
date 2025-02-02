import express from 'express';
import { setupMiddleware } from './setup/setup-middleware.js';
import { setupRouters } from './setup/setup-routers.js';
import { setupErrorHandler } from './setup/setup-error-handler.js';

const app = express();

setupMiddleware(app);
setupRouters(app);
setupErrorHandler(app);

export default app;
