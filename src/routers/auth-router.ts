import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';
import { validateRegisterBody } from '../middleware/request-validators/validate-register-body-middleware.js';
import { handleAsync } from '../middleware/handle-async-middleware.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRegisterBody,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const savedUser = await register(username, email, password);
    res.status(201).json(savedUser);
  }),
);

authRouter.post('/login', login);
authRouter.post('/verify', verify);
authRouter.post('/logout', logout);

export { authRouter };
