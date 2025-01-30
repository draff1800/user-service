import { CustomError } from '../custom-error.js';

export class UnauthorizedError extends CustomError {
  private static readonly statusPhrase = 'Unauthorized';
  readonly StatusCode = 401;

  constructor(message?: string) {
    super(message ? `${UnauthorizedError.statusPhrase}: ${message}` : `${UnauthorizedError.statusPhrase}`);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  override serialize(): { message: string } {
    return { message: this.message };
  }
}
