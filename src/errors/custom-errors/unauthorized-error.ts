import type { SerialisedError } from '../../types/errors.js';
import { CustomError } from '../custom-error.js';

export class UnauthorizedError extends CustomError {
  private static readonly statusPhrase = 'Unauthorized';
  readonly StatusCode = 401;

  constructor(message?: string) {
    super(message ? message : UnauthorizedError.statusPhrase);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  override serialise(): SerialisedError {
    return { message: this.message };
  }
}
