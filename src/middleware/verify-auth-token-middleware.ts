import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorisedError } from '../errors/custom-errors/unauthorised-error.js';
import { envVariables } from '../config/env-variables.js';
import type { AuthTokenContents } from '../types/auth-token-contents.js';

export const verifyAuthToken = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  const authHeaderSubstring = 'Bearer ';

  if (!authHeader || !authHeader.startsWith(authHeaderSubstring)) {
    return next(new UnauthorisedError('Authorisation token is missing or malformed'));
  }

  const token = authHeader.replace(authHeaderSubstring, '');

  try {
    const tokenContents = jwt.verify(token, envVariables.jwtSecret) as AuthTokenContents;
    req.authTokenContents = tokenContents;
    next();
  } catch {
    next(new UnauthorisedError('Authorisation token is invalid or expired'));
  }
};
