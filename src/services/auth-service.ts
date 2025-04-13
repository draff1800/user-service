import { envVariables } from '../config.js';
import { User } from '../db/models/user-model.js';
import { capitalise } from '../utils/string-utils.js';
import { logger } from '../utils/logger.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { BadRequestError } from '../errors/custom-errors/bad-request-error.js';
import type { LoginData, LoginResponse, RegistrationData, SerialisedUser } from '../types/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UnauthorizedError } from '../errors/custom-errors/unauthorized-error.js';

const registerUser = async (registrationData: RegistrationData): Promise<SerialisedUser> => {
  const { username, email, password } = registrationData;

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

const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  const { email, password } = loginData;

  const invalidCredentialsError = new UnauthorizedError('Invalid credentials');

  const user = await User.findOne({ email });
  if (!user) throw invalidCredentialsError;

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) throw invalidCredentialsError;

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
    },
    envVariables.jwtSecret,
    { expiresIn: '1h' },
  );

  return { token };
};

export { registerUser, loginUser };
