import express from 'express';
import { handleError } from '../../middleware/handle-error-middleware.js';
import { checkForMalformedJson } from '../../middleware/request-body-validators/check-for-malformed-json-middleware.js';

export const setupErrorHandling = (app: express.Application): void => {
  app.use(checkForMalformedJson);
  app.use(handleError);
};
