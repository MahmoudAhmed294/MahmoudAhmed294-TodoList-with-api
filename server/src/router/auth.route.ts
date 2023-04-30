import * as userController from '../controller/auth.controller';
import { Router } from 'express';

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.register);



export default router;
