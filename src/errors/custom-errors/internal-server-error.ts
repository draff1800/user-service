import type { SerialisedError } from '../../types/errors.js';
import { CustomError } from '../custom-error.js';

export class InternalServerError extends CustomError {
  private static readonly statusPhrase = 'Internal Server Error';
  readonly StatusCode = 500;

  constructor(message?: string) {
    super(message ? message : InternalServerError.statusPhrase);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  override serialise(): SerialisedError {
    return { message: this.message };
  }
}
