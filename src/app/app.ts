import express from 'express';
import { setupBaseMiddleware } from './setup/setup-base-middleware.js';
import { setupRouters } from './setup/setup-routers.js';
import { setupErrorHandling } from './setup/setup-error-handling.js';

const app = express();

setupBaseMiddleware(app);
setupRouters(app);
setupErrorHandling(app);

export default app;
