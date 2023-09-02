import express from 'express';
import { signUpController } from './auth.controller';
const router = express.Router();

router.post('/signup',signUpController.signUP);
router.post('/signin',signUpController.logIn);

export const AuthRouter = router;
