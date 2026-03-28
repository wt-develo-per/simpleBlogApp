import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// register a new user
router.post('/register', registerUser);

// login a user
router.post('/login', loginUser);

// get user profile
router.get('/profile', getUserProfile);

export default router;