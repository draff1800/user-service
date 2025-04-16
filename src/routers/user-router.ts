import { Router } from 'express';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';
import {
  getCurrentUserDetails,
  updateCurrentUserDetails,
  deleteCurrentUser,
  getUserDetails,
} from '../controllers/user-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';
import { validateUpdatePayload } from '../middleware/request-validators/validate-update-payload-middleware.js';

const userRouter = Router();

userRouter.use(verifyAuthToken);

userRouter.get('/me', handleAsync(getCurrentUserDetails));
userRouter.put('/me', validateUpdatePayload, handleAsync(updateCurrentUserDetails));

userRouter.delete('/me', deleteCurrentUser);
userRouter.get('/:id', getUserDetails);

export { userRouter };
