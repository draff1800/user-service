export interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SerialisedUser {
  username: string;
  email: string;
  createdDateTime: Date;
  updatedDateTime: Date;
}

export interface LoginResponse {
  token: string;
}
