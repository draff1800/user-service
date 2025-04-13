import type { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from '../services/auth-service.js';

const register = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const savedUser = await registerUser(req.body);
  res.status(201).json(savedUser);
};

const login = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const loginResponse = await loginUser(req.body);
  res.status(200).json(loginResponse);
};

const verify = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const logout = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

export { register, login, verify, logout };
