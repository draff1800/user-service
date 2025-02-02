import type { Request, Response, NextFunction } from 'express';

export const handleAsync = (asyncFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunction(req, res, next)).catch(next);
  };
};
