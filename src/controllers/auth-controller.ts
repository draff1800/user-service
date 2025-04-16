import type { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { loginUser, registerUser } from '../services/auth-service.js';
import type { LoginResponse, VerifyResponse } from '../types/responses/auth-responses.js';
import type { Info } from '../types/info.js';
import type { SerialisedNewUser } from '../types/serialised-users.js';

const register = async (req: Request, res: Response<SerialisedNewUser>, _next: NextFunction): Promise<void> => {
  const savedUser = await registerUser(req.body);
  res.status(201).json(savedUser);
};

const login = async (req: Request, res: Response<LoginResponse>, _next: NextFunction): Promise<void> => {
  const loginResponse = await loginUser(req.body);
  res.status(200).json(loginResponse);
};

const verify = (req: Request, res: Response<VerifyResponse>, _next: NextFunction): void => {
  if (!req.authTokenContents) {
    throw new InternalServerError('Unexpected authorisation error occurred');
  }

  const verifyResponse = {
    user: {
      id: req.authTokenContents.sub,
      username: req.authTokenContents.username,
    },
  };

  res.status(200).json(verifyResponse);
};

const logout = (_req: Request, res: Response<Info>, _next: NextFunction): void => {
  res.status(200).json({ message: 'Logged out' });
};

export { register, login, verify, logout };
