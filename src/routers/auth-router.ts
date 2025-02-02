import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { register, login, verify, logout } from '../controllers/auth-controller.js';
import { validateRequest } from '../middleware/validate-request-middleware.js';

const authRouter = Router();

authRouter.post(
  '/register',
  [
    body('username')
      .isString()
      .withMessage('username must be a string')
      .notEmpty()
      .withMessage('username must not be empty'),
    body('email').isEmail().withMessage('email must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
    validateRequest,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const savedUser = await register(username, email, password);
      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post('/login', login);
authRouter.post('/verify', verify);
authRouter.post('/logout', logout);

export { authRouter };
