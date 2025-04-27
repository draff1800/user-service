import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import { API_VERSION } from '../../config/constants.js';

export const setupSwagger = (app: express.Application): void => {
  const swaggerBundle = yaml.load(path.resolve('swagger/bundle.yaml'));

  app.use(`/${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerBundle));
};
