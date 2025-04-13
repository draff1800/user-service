export interface RegisterResponse {
  username: string;
  email: string;
  createdDateTime: Date;
}

export interface LoginResponse {
  token: string;
}

export interface VerifyResponse {
  user: {
    id: string;
    username: string;
  };
}
