import dotenv from 'dotenv';

dotenv.config();

export const envVariables = {
  serverPort: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbHost: process.env.DB_HOST || 'mongodb://127.0.0.1',
  dbPort: process.env.DB_PORT || '27017',
  dbName: process.env.DB_NAME || 'myApp',
};
