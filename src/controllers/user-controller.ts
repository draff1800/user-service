import type { Request, Response, NextFunction } from 'express';

const getCurrentUserDetails = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const updateCurrentUserDetails = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const deleteCurrentUser = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const getUserDetails = (_req: Request, res: Response, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

export { getCurrentUserDetails, updateCurrentUserDetails, deleteCurrentUser, getUserDetails };
