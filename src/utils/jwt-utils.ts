import jwt from 'jsonwebtoken';

import { envVariables } from '../config/env-variables/env-variables.js';
import type { AuthTokenContents } from '../types/requests/auth-token-contents.js';

export const generateJwtForUser = (userId: string, username: string): string => {
  const tokenContents: AuthTokenContents = {
    sub: userId,
    username: username,
  };

  return jwt.sign(tokenContents, envVariables.jwtSecret, { expiresIn: '1h' });
};
