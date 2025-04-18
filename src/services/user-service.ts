import bcrypt from 'bcrypt';

import { User } from '../db/models/user-model.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { NotFoundError } from '../errors/custom-errors/not-found-error.js';
import { UnauthorisedError } from '../errors/custom-errors/unauthorised-error.js';
import type { UpdateBody } from '../types/requests/bodies/user-bodies.js';
import type { SerialisedExistingUser } from '../types/serialised-users.js';
import { findUserByIdOrThrow, saveUserError } from '../utils/mongoose-utils.js';

const getUserById = async (id: string): Promise<SerialisedExistingUser> => {
  const user = await findUserByIdOrThrow(id);

  return user.serialiseExistingUser();
};

const updateUserById = async (id: string, updateBody: UpdateBody): Promise<SerialisedExistingUser> => {
  const { newEmail, newUsername, newPassword, currentPassword } = updateBody;

  const user = await findUserByIdOrThrow(id);

  if (newUsername) user.username = newUsername;
  if (newEmail) user.email = newEmail;

  if (newPassword) {
    user.passwordHash = await getNewPasswordHashOrThrow(newPassword, currentPassword, user.passwordHash);
  }

  try {
    await user.save();
  } catch (err) {
    throw saveUserError(err, `Couldn't update user. Please try again later`);
  }

  return user.serialiseExistingUser();
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

const deleteUserById = async (id: string): Promise<void> => {
  const user = await findUserByIdOrThrow(id);

  try {
    await user.deleteOne();
  } catch {
    throw new InternalServerError("Couldn't delete User - Unexpected error occurred");
  }
};

const getUserByUsername = async (username: string): Promise<SerialisedExistingUser> => {
  let user;

  try {
    user = await User.findOne({ username });
  } catch {
    throw new InternalServerError("Couldn't get User - Unexpected error occurred");
  }

  if (!user) throw new NotFoundError('User not found');

  return user.serialiseExistingUser();
};

export { deleteUserById, getUserById, getUserByUsername, updateUserById };
