import { Router } from 'express';
import authController from './auth.controller.js';

const router = Router();

router.post('/signup', authController.signUpUser);
router.post('/signin', authController.signinUser);

const authRouter = router;
export default authRouter;
