import type { Request, Response } from 'express';
import { CustomError } from '../errors/custom-error.js';

export default (err: Error, _: Request, res: Response): void => {
  if (err instanceof CustomError) {
    res.status(err.StatusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};
