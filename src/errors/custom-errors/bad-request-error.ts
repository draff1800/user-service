import type { SerialisedError } from '../../types/errors.js';
import { CustomError } from '../custom-error.js';

export class BadRequestError extends CustomError {
  private static readonly statusPhrase = 'Bad Request';
  readonly StatusCode = 400;

  constructor(message?: string) {
    super(message ? `${BadRequestError.statusPhrase}: ${message}` : `${BadRequestError.statusPhrase}`);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  override serialise(): SerialisedError {
    return { message: this.message };
  }
}
