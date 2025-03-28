import express from 'express';
import { register, login } from '../controllers/usercontroller.js';

const router = express.Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

export default router;
