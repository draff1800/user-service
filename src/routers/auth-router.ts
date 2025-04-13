import { Router } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';
import { validateLoginBody } from '../middleware/request-validators/validate-login-body-middleware.js';
import { validateRegisterBody } from '../middleware/request-validators/validate-register-body-middleware.js';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegisterBody, handleAsync(register));
authRouter.post('/login', validateLoginBody, handleAsync(login));
authRouter.post('/verify', verifyAuthToken, verify);
authRouter.post('/logout', logout);

export { authRouter };
