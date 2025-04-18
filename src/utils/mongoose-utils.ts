import mongoose from 'mongoose';

import { User, type UserDocument, type UserMethods } from '../db/models/user-model.js';
import type { CustomError } from '../errors/custom-error.js';
import { BadRequestError } from '../errors/custom-errors/bad-request-error.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { NotFoundError } from '../errors/custom-errors/not-found-error.js';
import { capitalise } from '../utils/string-utils.js';

export const saveUserError = (err: unknown, fallbackMessage: string): CustomError => {
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    const field = capitalise(Object.keys(err.keyValue)[0]);
    return new BadRequestError(`${field} is already taken`);
  }

  return new InternalServerError(fallbackMessage);
};

export const findUserByIdOrThrow = async (id: string): Promise<UserDocument & UserMethods> => {
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequestError("Couldn't get User - Malformed ID");
    }
    throw new InternalServerError("Couldn't get User - Unexpected error occurred");
  }

  if (!user) throw new NotFoundError('User not found');

  return user;
};
