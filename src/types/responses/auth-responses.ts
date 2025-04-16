export interface LoginResponse {
  token: string;
}

export interface VerifyResponse {
  user: {
    id: string;
    username: string;
  };
}
