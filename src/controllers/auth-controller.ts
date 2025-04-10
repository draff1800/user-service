import bcrypt from 'bcrypt';
import { User } from '../db/models/user-model.js';
import { logger } from '../utils/logger.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import type { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/custom-errors/bad-request-error.js';
import mongoose from 'mongoose';

const register = async (username: string, email: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);

  let savedUser;

  try {
    savedUser = await User.create({
      username,
      email,
      passwordHash,
    });
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      throw new BadRequestError(`${field} is already taken`);
    } else {
      throw new InternalServerError(`Couldn't register user. Please try again later`);
    }
  }

  logger.info('New user saved', {
    userId: savedUser._id,
    username: savedUser.username,
  });

  return savedUser.serialize();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const login = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const verify = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

export { register, login, verify, logout };
