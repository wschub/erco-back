import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register); // {email, password, role}
router.post('/login', login);       // {email, password}

export default router;
