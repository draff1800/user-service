import { CustomError } from '../custom-error.js';

export class BadRequestError extends CustomError {
  StatusCode = 403;

  constructor() {
    super('Bad Request');
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  override serialize(): { message: string } {
    return { message: 'Bad Request' };
  }
}
