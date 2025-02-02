import type { NextFunction, Request, Response } from 'express';

export const authenticateUser = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};
