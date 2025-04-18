import type { AuthTokenContents } from './auth-token-contents.ts';

declare global {
  namespace Express {
    interface Request {
      authTokenContents?: AuthTokenContents;
    }
  }
}
