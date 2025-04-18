import type { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../../errors/custom-errors/bad-request-error.js';
import type { JsonSyntaxError } from '../../types/json-syntax-error.js';

export const checkForMalformedJson = (err: Error, _req: Request, _res: Response, next: NextFunction): void => {
  if (err instanceof SyntaxError && (err as JsonSyntaxError).status === 400 && 'body' in err) {
    return next(new BadRequestError('Malformed JSON in request body'));
  }

  next(err);
};
