import { CustomError } from '../custom-error.js';

export class ValidateRequestError extends CustomError {
  private static readonly statusPhrase = 'Bad Request';
  private validationErrors: string[];
  readonly StatusCode = 400;

  constructor(message?: string, validationErrors?: string[]) {
    super(message ? `${ValidateRequestError.statusPhrase}: ${message}` : `${ValidateRequestError.statusPhrase}`);
    this.validationErrors = validationErrors || [];
    Object.setPrototypeOf(this, ValidateRequestError.prototype);
  }

  override serialize(): { message: string; errors: string[] } {
    return { message: this.message, errors: this.validationErrors };
  }
}
