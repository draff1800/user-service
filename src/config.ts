import dotenv from 'dotenv';

dotenv.config();

export const envVariables = {
  serverPort: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'Development',
  dbUser: process.env.DB_USER || 'User',
  dbPassword: process.env.DB_PASSWORD || 'Password',
  dbClusterName: process.env.DB_CLUSTER_NAME || 'Cluster',
  dbDatabaseName: process.env.DB_DATABASE_NAME || 'Database',
};
