import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { API_VERSION } from '../../config/constants.js';
import { swaggerSpec } from '../../swagger-spec.js';

export const setupSwagger = (app: express.Application): void => {
  app.use(`/${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
