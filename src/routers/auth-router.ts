import { Router } from 'express';
import { register, login, verify, logout } from '../controllers/auth-controller.js';

const router = Router();

router.get('/v1/auth/register', register);
router.get('/v1/auth/login', login);
router.get('/v1/auth/verify', verify);
router.get('v1/auth/logout', logout);

export default router;
