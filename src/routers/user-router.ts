import { Router } from 'express';
import { authenticateUser } from '../middleware/authenticate-user-middleware.js';
import {
  getCurrentUserDetails,
  updateCurrentUserDetails,
  deleteCurrentUser,
  getUserDetails,
} from '../controllers/user-controller.js';

const router = Router();

router.use(authenticateUser);

router.get('/v1/users/me', getCurrentUserDetails);
router.put('/v1/users/me', updateCurrentUserDetails);
router.delete('/v1/users/me', deleteCurrentUser);
router.get('v1/users/:id', getUserDetails);

export default router;
