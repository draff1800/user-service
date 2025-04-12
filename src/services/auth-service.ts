import bcrypt from 'bcrypt';
import { User } from '../db/models/user-model.js';
import { capitalise } from '../utils/string-utils.js';
import { logger } from '../utils/logger.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { BadRequestError } from '../errors/custom-errors/bad-request-error.js';
import mongoose from 'mongoose';
import type SerialisedUser from '../types/serialised-user.js';

const registerUser = async (username: string, email: string, password: string): Promise<SerialisedUser> => {
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
      const field = capitalise(Object.keys(err.keyValue)[0]);
      throw new BadRequestError(`${field} is already taken`);
    } else {
      throw new InternalServerError(`Couldn't register user. Please try again later`);
    }
  }

  logger.info('New User saved', {
    userId: savedUser._id,
    username: savedUser.username,
  });

  return savedUser.serialise();
};

export { registerUser };
