import type { Info } from '../../types/info.js';
import { CustomError } from '../custom-error.js';

export class UnauthorisedError extends CustomError {
  private static readonly statusPhrase = 'Unauthorized';
  readonly StatusCode = 401;

  constructor(message?: string) {
    super(message ? message : UnauthorisedError.statusPhrase);
    Object.setPrototypeOf(this, UnauthorisedError.prototype);
  }

  override serialise(): Info {
    return { message: this.message };
  }
}
