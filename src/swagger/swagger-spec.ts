import swaggerJsdoc from 'swagger-jsdoc';

import { API_VERSION } from '../config/constants.js';
import { envVariables } from '../config/env-variables/env-variables.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Service',
    version: API_VERSION,
    description: 'Documentation for the User Service API',
  },
  servers: [
    {
      url: `http://localhost:${envVariables.port}/${API_VERSION}`,
      description: 'Local',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['src/routers/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
