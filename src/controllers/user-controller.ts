import type { Request, Response, NextFunction } from 'express';
import type { Info } from '../types/info.js';
import type { SerialisedUser } from '../types/serialised-user.js';
import { getUserById } from '../services/user-service.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';

const getCurrentUserDetails = async (
  req: Request,
  res: Response<SerialisedUser>,
  _next: NextFunction,
): Promise<void> => {
  if (!req.authTokenContents) {
    throw new InternalServerError('Unexpected authorisation error occurred');
  }

  const user = await getUserById(req.authTokenContents?.sub);
  res.status(200).json(user);
};

const updateCurrentUserDetails = (_req: Request, res: Response<Info>, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const deleteCurrentUser = (_req: Request, res: Response<Info>, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

const getUserDetails = (_req: Request, res: Response<Info>, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

export { getCurrentUserDetails, updateCurrentUserDetails, deleteCurrentUser, getUserDetails };
