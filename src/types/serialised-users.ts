export interface SerialisedNewUser {
  username: string;
  email: string;
  createdDateTime: Date;
}

export interface SerialisedExistingUser extends SerialisedNewUser {
  updatedDateTime: Date;
}
