import { Router } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';
import { errorHandler } from '../middleware/error-handler-middleware.js';

const router = Router();
const authRouter = Router();

router.get('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const savedUser = await register(username, email, password);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.get('/login', login);
router.get('/verify', verify);
router.get('/logout', logout);

router.use('v1/auth', authRouter);
router.use(errorHandler);

export default router;
