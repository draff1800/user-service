import type { Info } from '../../types/info.js';
import { CustomError } from '../custom-error.js';

export class NotFoundError extends CustomError {
  private static readonly statusPhrase = 'Not Found';
  readonly StatusCode = 404;

  constructor(message?: string) {
    super(message ? message : NotFoundError.statusPhrase);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  override serialise(): Info {
    return { message: this.message };
  }
}
