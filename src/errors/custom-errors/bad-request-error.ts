import { CustomError } from '../custom-error.js';

export class BadRequestError extends CustomError {
  private static readonly statusPhrase = 'Bad Request';
  readonly StatusCode = 403;

  constructor(message?: string) {
    super(message ? `${BadRequestError.statusPhrase}: ${message}` : `${BadRequestError.statusPhrase}`);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  override serialize(): { message: string } {
    return { message: this.message };
  }
}
