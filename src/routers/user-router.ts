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

router.get('/me', getCurrentUserDetails);
router.put('/me', updateCurrentUserDetails);
router.delete('/me', deleteCurrentUser);
router.get('/:id', getUserDetails);

export default router;
