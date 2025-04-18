import bcrypt from 'bcrypt';

import { User, type UserDocument, type UserMethods } from '../db/models/user-model.js';
import { NotFoundError } from '../errors/custom-errors/not-found-error.js';
import { UnauthorisedError } from '../errors/custom-errors/unauthorised-error.js';
import type { UpdatePayload } from '../types/payloads/user-payloads.js';
import type { SerialisedExistingUser } from '../types/serialised-users.js';
import { saveUserError } from '../utils/mongoose-utils.js';

const getUserById = async (id: string): Promise<SerialisedExistingUser> => {
  const user = await findUserByIdOrThrow(id);

  return user.serialiseExistingUser();
};

const updateUserById = async (id: string, updatePayload: UpdatePayload): Promise<SerialisedExistingUser> => {
  const { newEmail, newUsername, newPassword, currentPassword } = updatePayload;

  const user = await findUserByIdOrThrow(id);

  if (newUsername) user.username = newUsername;
  if (newEmail) user.email = newEmail;

  if (newPassword) {
    user.passwordHash = await getNewPasswordHashOrThrow(newPassword, currentPassword, user.passwordHash);
  }

  try {
    await user.save();
  } catch (err: unknown) {
    throw saveUserError(err, `Couldn't update user. Please try again later`);
  }

  return user.serialiseExistingUser();
};

const findUserByIdOrThrow = async (id: string): Promise<UserDocument & UserMethods> => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');

  return user;
};

const getNewPasswordHashOrThrow = async (
  newPassword: string,
  currentPassword: string | undefined,
  currentPasswordHash: string,
): Promise<string> => {
  const unauthorisedError = new UnauthorisedError('Invalid Current Password');

  if (!currentPassword) throw unauthorisedError;
  const passwordMatch = await bcrypt.compare(currentPassword, currentPasswordHash);
  if (!passwordMatch) throw unauthorisedError;

  return await bcrypt.hash(newPassword, 10);
};

export { getUserById, updateUserById };
