import { Router } from 'express';
import { authenticateUser } from '../middleware/authenticate-user-middleware.js';
import {
  getCurrentUserDetails,
  updateCurrentUserDetails,
  deleteCurrentUser,
  getUserDetails,
} from '../controllers/user-controller.js';

const userRouter = Router();

userRouter.use(authenticateUser);

userRouter.get('/me', getCurrentUserDetails);
userRouter.put('/me', updateCurrentUserDetails);
userRouter.delete('/me', deleteCurrentUser);
userRouter.get('/:id', getUserDetails);

export { userRouter };
