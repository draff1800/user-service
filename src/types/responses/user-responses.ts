import type { SerialisedExistingUser } from '../serialised-users.js';

export interface UpdateCurrentUserDetailsResponse {
  user: SerialisedExistingUser;
  token?: string;
}
