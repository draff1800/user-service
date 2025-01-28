import { CustomError } from '../custom-error.js';

export class NotFoundError extends CustomError {
  StatusCode = 404;

  constructor() {
    super('Not Found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  override serialize(): { message: string } {
    return { message: 'Not Found' };
  }
}
