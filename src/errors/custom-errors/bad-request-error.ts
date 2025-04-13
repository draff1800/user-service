import type { Info } from '../../types/info.js';
import { CustomError } from '../custom-error.js';

export class BadRequestError extends CustomError {
  private static readonly statusPhrase = 'Bad Request';
  readonly StatusCode = 400;

  constructor(message?: string) {
    super(message ? message : BadRequestError.statusPhrase);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  override serialise(): Info {
    return { message: this.message };
  }
}
