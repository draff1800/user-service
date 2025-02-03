import dotenv from 'dotenv';

dotenv.config();

export const envVariables = {
  serverPort: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUser: process.env.DB_USER || 'user',
  dbPassword: process.env.DB_PASSWORD || 'password',
  dbClusterName: process.env.DB_CLUSTER_NAME || 'cluster',
  dbDatabaseName: process.env.DB_DATABASE_NAME || 'database',
};
