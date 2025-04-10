import type { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import { CustomError } from '../errors/custom-error.js';

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  logger.error('Error caught by central error handler', {
    method: req.method,
    url: req.url,
    errorMessage: err.message,
    errorStack: err.stack,
  });

  if (err instanceof CustomError) {
    res.status(err.StatusCode).json(err.serialize());
  } else {
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};
