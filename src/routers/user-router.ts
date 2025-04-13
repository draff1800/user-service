import { Router } from 'express';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';
import {
  getCurrentUserDetails,
  updateCurrentUserDetails,
  deleteCurrentUser,
  getUserDetails,
} from '../controllers/user-controller.js';

const userRouter = Router();

userRouter.use(verifyAuthToken);

userRouter.get('/me', getCurrentUserDetails);
userRouter.put('/me', updateCurrentUserDetails);
userRouter.delete('/me', deleteCurrentUser);
userRouter.get('/:id', getUserDetails);

export { userRouter };
