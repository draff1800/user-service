import bcrypt from 'bcrypt';

import { User, type UserDocument, type UserMethods } from '../db/models/user-model.js';
import { UnauthorisedError } from '../errors/custom-errors/unauthorised-error.js';
import type { LoginPayload, RegisterPayload } from '../types/payloads/auth-payloads.js';
import type { LoginResponse } from '../types/responses/auth-responses.js';
import type { SerialisedNewUser } from '../types/serialised-users.js';
import { generateJwtForUser } from '../utils/jwt-utils.js';
import { logger } from '../utils/logger.js';
import { saveUserError } from '../utils/mongoose-utils.js';

const registerUser = async (registerPayload: RegisterPayload): Promise<SerialisedNewUser> => {
  const { username, email, password } = registerPayload;

  const passwordHash = await bcrypt.hash(password, 10);

  let savedUser: UserDocument & UserMethods;

  try {
    savedUser = await User.create({
      username,
      email,
      passwordHash,
    });
  } catch (err: unknown) {
    throw saveUserError(err, `Couldn't save user. Please try again later`);
  }

  logger.info('New User saved', {
    userId: savedUser._id,
    username: savedUser.username,
  });

  return savedUser.serialiseNewUser();
};

const loginUser = async (loginPayload: LoginPayload): Promise<LoginResponse> => {
  const { email, password } = loginPayload;

  const invalidCredentialsError = new UnauthorisedError('Invalid credentials');

  const user = await User.findOne({ email });
  if (!user) throw invalidCredentialsError;

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) throw invalidCredentialsError;

  const userId = user._id.toString();
  const token = generateJwtForUser(userId, user.username);

  return { token };
};

export { loginUser, registerUser };
