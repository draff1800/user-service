import { Router } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const savedUser = await register(username, email, password);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', login);
router.post('/verify', verify);
router.post('/logout', logout);

export default router;
