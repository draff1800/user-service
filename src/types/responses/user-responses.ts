import type { SerialisedExistingUser } from '../serialised-users.js';

export interface UpdateCurrentUserResponse {
  user: SerialisedExistingUser;
  token?: string;
}
