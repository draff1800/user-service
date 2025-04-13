import { Router } from 'express';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';
import {
  getCurrentUserDetails,
  updateCurrentUserDetails,
  deleteCurrentUser,
  getUserDetails,
} from '../controllers/user-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';

const userRouter = Router();

userRouter.use(verifyAuthToken);

userRouter.get('/me', verifyAuthToken, handleAsync(getCurrentUserDetails));

userRouter.put('/me', updateCurrentUserDetails);
userRouter.delete('/me', deleteCurrentUser);
userRouter.get('/:id', getUserDetails);

export { userRouter };
