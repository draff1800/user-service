import { CustomError } from '../custom-error.js';

export class InternalServerError extends CustomError {
  private static readonly statusPhrase = 'Internal Server Error';
  readonly StatusCode = 500;

  constructor(message: string) {
    super(message ? `${InternalServerError.statusPhrase}: ${message}` : `${InternalServerError.statusPhrase}`);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  override serialize(): { message: string } {
    return { message: this.message };
  }
}
