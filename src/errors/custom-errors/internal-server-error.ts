import { CustomError } from '../custom-error.js';

export class InternalServerError extends CustomError {
  StatusCode = 500;

  constructor() {
    super('Internal Server Error');
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  override serialize(): { message: string } {
    return { message: 'Internal Server Error' };
  }
}
