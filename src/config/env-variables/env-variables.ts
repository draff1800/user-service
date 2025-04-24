/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

import { checkRequiredVariables, getSafeNodeEnv, getSafePort } from './env-variable-utils.js';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_CLUSTER_NAME, DB_DATABASE_NAME, JWT_SECRET } = process.env;

checkRequiredVariables({
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER_NAME,
  DB_DATABASE_NAME,
  JWT_SECRET,
});

export const envVariables = {
  nodeEnv: getSafeNodeEnv(),
  port: getSafePort(),
  dbUser: DB_USER!,
  dbPassword: DB_PASSWORD!,
  dbClusterName: DB_CLUSTER_NAME!,
  dbDatabaseName: DB_DATABASE_NAME!,
  jwtSecret: JWT_SECRET!,
};
