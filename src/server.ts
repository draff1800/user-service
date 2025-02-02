import app from './app/app.js';
import config from './config.js';
import { logger } from './utils/logger.js';

const PORT = config.port;
const NODEENV = config.nodeEnv;

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT} in ${NODEENV} mode`);
});
