import type { NodeEnv } from '../../types/node-env.js';
import { logger } from '../../utils/logger.js';
import { NODE_ENVS } from '../constants.js';

export const checkRequiredVariables = (variables: Record<string, string | undefined>): void => {
  const missingVariables = Object.entries(variables)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVariables.length > 0) {
    logger.error(`Missing required environment variables: ${missingVariables.join(', ')}. Shutting down...`);
    process.exit(1);
  }
};

export const getSafeNodeEnv = (): NodeEnv => {
  const rawNodeEnv = process.env.NODE_ENV;

  if (!rawNodeEnv) {
    logger.warn(`NODE_ENV not set. Defaulting to "${NODE_ENVS.DEVELOPMENT}"`);
    return NODE_ENVS.DEVELOPMENT;
  }

  const rawNodeEnvIsInvalid = !Object.values(NODE_ENVS).includes(rawNodeEnv as NodeEnv);

  if (rawNodeEnvIsInvalid) {
    logger.error(
      `NODE_ENV "${rawNodeEnv}" is invalid. Must be "${NODE_ENVS.DEVELOPMENT}" or "${NODE_ENVS.PRODUCTION}". Defaulting to "${NODE_ENVS.DEVELOPMENT}"`,
    );
    return NODE_ENVS.DEVELOPMENT;
  } else {
    return rawNodeEnv as NodeEnv;
  }
};

export const getSafePort = (): number => {
  const rawPort = process.env.PORT;
  const defaultPort = 3000;

  if (!rawPort) {
    logger.warn(`PORT not set. Defaulting to ${defaultPort}`);
    return defaultPort;
  }

  const processedPort = Number(rawPort);

  if (Number.isNaN(processedPort) || processedPort < 1 || processedPort > 65535) {
    logger.error(`PORT "${rawPort}" is invalid. Must be a number between 1 and 65535. Defaulting to ${defaultPort}`);
    return defaultPort;
  }

  return processedPort;
};
