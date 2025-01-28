import { CustomError } from '../custom-error.js';

export class UnauthorizedError extends CustomError {
  StatusCode = 404;

  constructor() {
    super('Unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  override serialize(): { message: string } {
    return { message: 'Unauthorized' };
  }
}
