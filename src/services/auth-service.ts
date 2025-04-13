import { envVariables } from '../config.js';
import { User } from '../db/models/user-model.js';
import { capitalise } from '../utils/string-utils.js';
import { logger } from '../utils/logger.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { BadRequestError } from '../errors/custom-errors/bad-request-error.js';
import type { LoginPayload, RegisterPayload } from '../types/payloads/auth-payloads.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UnauthorisedError } from '../errors/custom-errors/unauthorised-error.js';
import type { AuthTokenContents } from '../types/auth-token-contents.js';
import type { LoginResponse, RegisterResponse } from '../types/responses/auth-responses.js';

const registerUser = async (registerPayload: RegisterPayload): Promise<RegisterResponse> => {
  const { username, email, password } = registerPayload;

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

  return {
    username: savedUser.username,
    email: savedUser.email,
    createdDateTime: savedUser.createdDateTime,
  };
};

const loginUser = async (loginPayload: LoginPayload): Promise<LoginResponse> => {
  const { email, password } = loginPayload;

  const invalidCredentialsError = new UnauthorisedError('Invalid credentials');

  const user = await User.findOne({ email });
  if (!user) throw invalidCredentialsError;

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) throw invalidCredentialsError;

  const tokenContents: AuthTokenContents = {
    sub: user._id.toString(),
    username: user.username,
  };

  const token = jwt.sign(tokenContents, envVariables.jwtSecret, { expiresIn: '1h' });

  return { token };
};

export { registerUser, loginUser };
