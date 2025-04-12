import { Router } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';
import { validateRegisterBody } from '../middleware/request-validators/validate-register-body-middleware.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegisterBody, handleAsync(register));

authRouter.post('/login', login);
authRouter.post('/verify', verify);
authRouter.post('/logout', logout);

export { authRouter };
