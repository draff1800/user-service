import mongoose from 'mongoose';

import type { CustomError } from '../errors/custom-error.js';
import { BadRequestError } from '../errors/custom-errors/bad-request-error.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { capitalise } from '../utils/string-utils.js';

export const saveUserError = (err: unknown, fallbackMessage: string): CustomError => {
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    const field = capitalise(Object.keys(err.keyValue)[0]);
    return new BadRequestError(`${field} is already taken`);
  }

  return new InternalServerError(fallbackMessage);
};
