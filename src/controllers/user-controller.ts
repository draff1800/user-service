import type { NextFunction, Request, Response } from 'express';

import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { deleteUserById, getUserById, updateUserById } from '../services/user-service.js';
import type { Info } from '../types/info.js';
import type { UpdateCurrentUserDetailsResponse } from '../types/responses/user-responses.js';
import type { SerialisedExistingUser } from '../types/serialised-users.js';
import { generateJwtForUser } from '../utils/jwt-utils.js';

const getCurrentUserDetails = async (
  req: Request,
  res: Response<SerialisedExistingUser>,
  _next: NextFunction,
): Promise<void> => {
  if (!req.authTokenContents) {
    throw new InternalServerError('Unexpected authorisation error occurred');
  }

  const user = await getUserById(req.authTokenContents.sub);
  res.status(200).json(user);
};

const updateCurrentUserDetails = async (
  req: Request,
  res: Response<UpdateCurrentUserDetailsResponse>,
  _next: NextFunction,
): Promise<void> => {
  if (!req.authTokenContents) {
    throw new InternalServerError('Unexpected authorisation error occurred');
  }

  const userId = req.authTokenContents.sub;
  const updatedUser = await updateUserById(userId, req.body);

  const responseBody: UpdateCurrentUserDetailsResponse = { user: updatedUser };

  if (updatedUser.username !== req.authTokenContents.username) {
    responseBody.token = generateJwtForUser(userId, updatedUser.username);
  }

  res.status(200).json(responseBody);
};

const deleteCurrentUser = async (req: Request, res: Response<Info>, _next: NextFunction): Promise<void> => {
  if (!req.authTokenContents) {
    throw new InternalServerError('Unexpected authorisation error occurred');
  }

  await deleteUserById(req.authTokenContents.sub);

  res.status(200).json({ message: 'User deleted' });
};

const getUserDetails = (_req: Request, res: Response<Info>, _next: NextFunction): void => {
  res.json({ message: 'Yet to be implemented...' });
};

export { deleteCurrentUser, getCurrentUserDetails, getUserDetails, updateCurrentUserDetails };
