import { Router } from 'express';

import { login, logout, register, verify } from '../controllers/auth-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';
import { validateLoginBody } from '../middleware/request-validators/body/wellformedjson/validate-login-body-middleware.js';
import { validateRegisterBody } from '../middleware/request-validators/body/wellformedjson/validate-register-body-middleware.js';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegisterBody, handleAsync(register));
authRouter.post('/login', validateLoginBody, handleAsync(login));
authRouter.post('/verify', verifyAuthToken, handleAsync(verify));
authRouter.post('/logout', logout);

export { authRouter };
