import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCurrentUserDetails = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateCurrentUserDetails = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteCurrentUser = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserDetails = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Yet to be implemented...' });
};

export { getCurrentUserDetails, updateCurrentUserDetails, deleteCurrentUser, getUserDetails };
