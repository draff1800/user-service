import type { SerialisedError } from '../../types/errors.js';
import { CustomError } from '../custom-error.js';

export class NotFoundError extends CustomError {
  private static readonly statusPhrase = 'Not Found';
  readonly StatusCode = 404;

  constructor(message?: string) {
    super(message ? `${NotFoundError.statusPhrase}: ${message}` : `${NotFoundError.statusPhrase}`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  override serialise(): SerialisedError {
    return { message: this.message };
  }
}
