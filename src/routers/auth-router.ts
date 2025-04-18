import { Router } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';
import { validateLoginPayload } from '../middleware/request-body-validators/wellformedjson/validate-login-payload-middleware.js';
import { validateRegisterPayload } from '../middleware/request-body-validators/wellformedjson/validate-register-payload-middleware.js';
import { verifyAuthToken } from '../middleware/verify-auth-token-middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegisterPayload, handleAsync(register));
authRouter.post('/login', validateLoginPayload, handleAsync(login));
authRouter.post('/verify', verifyAuthToken, verify);
authRouter.post('/logout', logout);

export { authRouter };
