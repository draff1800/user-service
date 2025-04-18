import { Router } from 'express';

import {
  deleteCurrentUser,
  getCurrentUserDetails,
  getUserDetails,
  updateCurrentUserDetails,
} from '../controllers/user-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';
import { validateUpdatePayload } from '../middleware/request-body-validators/wellformedjson/validate-update-payload-middleware.js';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';

const userRouter = Router();

userRouter.use(verifyAuthToken);

userRouter.get('/me', handleAsync(getCurrentUserDetails));
userRouter.put('/me', validateUpdatePayload, handleAsync(updateCurrentUserDetails));

userRouter.delete('/me', deleteCurrentUser);
userRouter.get('/:id', getUserDetails);

export { userRouter };
