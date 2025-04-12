import type { Request, Response, NextFunction } from 'express';
import { registerUser } from '../services/auth-service.js';

const register = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;
  const savedUser = await registerUser(username, email, password);
  res.status(201).json(savedUser);
};

const login = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const verify = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const logout = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

export { register, login, verify, logout };
