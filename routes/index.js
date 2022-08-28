import express from 'express';
import { refreshToken } from '../controller/RefreshToken.js';
import { getUsers, Login, LogOut, Register } from '../controller/Users.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', LogOut);

export default router;
