import type { NextFunction, Request, Response } from 'express';

import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';
import { deleteUserById, getUserById, getUserByUsername, updateUserById } from '../services/user-service.js';
import type { Info } from '../types/info.js';
import type { UpdateCurrentUserResponse } from '../types/responses/user-responses.js';
import type { SerialisedExistingUser } from '../types/serialised-users.js';
import { generateJwtForUser } from '../utils/jwt-utils.js';

const getCurrentUser = async (
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

const updateCurrentUser = async (
  req: Request,
  res: Response<UpdateCurrentUserResponse>,
  _next: NextFunction,
): Promise<void> => {
  if (!req.authTokenContents) {
    throw new InternalServerError('Unexpected authorisation error occurred');
  }

  const userId = req.authTokenContents.sub;
  const updatedUser = await updateUserById(userId, req.body);

  const responseBody: UpdateCurrentUserResponse = { user: updatedUser };

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

const getUser = async (req: Request, res: Response<SerialisedExistingUser>, _next: NextFunction): Promise<void> => {
  const username = req.params.username;
  if (!username) throw new InternalServerError('Unexpected error occurred when reading username');

  const user = await getUserByUsername(username);

  res.status(200).json(user);
};

export { deleteCurrentUser, getCurrentUser, getUser as getUser, updateCurrentUser };
