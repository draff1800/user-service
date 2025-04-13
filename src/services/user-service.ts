import { User } from '../db/models/user-model.js';
import { NotFoundError } from '../errors/custom-errors/not-found-error.js';
import type { SerialisedUser } from '../types/serialised-user.js';

const getUserById = async (id: string): Promise<SerialisedUser> => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');

  return user.serialise();
};

export { getUserById };
