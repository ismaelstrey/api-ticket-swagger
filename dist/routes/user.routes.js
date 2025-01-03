import { Router } from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/user.controller.js';
const router = Router();
router.post('/register', registerUser);
router.get('/all', getAllUsers);
router.post('/login', loginUser);
export { router as userRoutes };
