import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidateRequestError } from '../../../errors/custom-errors/validate-request-error.js';

export const checkForValidationErrors = (req: Request, _res: Response, next: NextFunction): void => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorStrings = validationErrors.array().map((error) => error.msg);
    return next(new ValidateRequestError('Invalid payload', errorStrings));
  }

  next();
};
