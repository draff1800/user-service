import { envVariables } from '../config/env-variables.js';
import type { AuthTokenContents } from '../types/auth-token-contents.js';
import jwt from 'jsonwebtoken';

export const generateJwtForUser = (userId: string, username: string): string => {
  const tokenContents: AuthTokenContents = {
    sub: userId,
    username: username,
  };

  return jwt.sign(tokenContents, envVariables.jwtSecret, { expiresIn: '1h' });
};
