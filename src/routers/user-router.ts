import { Router } from 'express';

import { deleteCurrentUser, getCurrentUser, getUser, updateCurrentUser } from '../controllers/user-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';
import { validateUpdateBody } from '../middleware/request-validators/body/wellformedjson/validate-update-body-middleware.js';
import { validateParam } from '../middleware/request-validators/params/validate-param-middleware.js';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';

const userRouter = Router();

userRouter.use(verifyAuthToken);

userRouter.get('/me', handleAsync(getCurrentUser));
userRouter.put('/me', validateUpdateBody, handleAsync(updateCurrentUser));
userRouter.delete('/me', handleAsync(deleteCurrentUser));
userRouter.get('/by-username/:username', validateParam('username'), handleAsync(getUser));

export { userRouter };
