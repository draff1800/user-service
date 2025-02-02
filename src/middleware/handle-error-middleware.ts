import type { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error.js';

export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res.status(err.StatusCode).json(err.serialize());
  } else {
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};
