import { Router } from 'express';
import { createTransaction, getTransactions} from '../controllers/transaction.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
const router = Router();



// 👤 Buyer crea transacción
router.post('/', authenticate, authorizeRoles('buyer'), createTransaction);

// 👤 Admin, Buyer, Seller pueden ver sus transacciones (filtradas por rol)
router.get('/', authenticate, authorizeRoles('admin', 'buyer', 'seller'), getTransactions);




export default router;

