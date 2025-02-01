import app from './app.js';
import config from './config.js';

const PORT = config.port;
const NODEENV = config.nodeEnv;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT} in ${NODEENV} mode`);
});
