import { Router } from 'express';
import {
  createOffer,
  deleteOffer,
  getOffers,
  getOfferById,
  updateOffer,
} from '../controllers/offer.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
const router = Router();

//router.post('/', authenticate, authorizeRoles('seller'), createOffer);

router.post('/', authenticate, authorizeRoles('seller'), createOffer);
router.get('/', authenticate, authorizeRoles('admin','buyer','seller'), getOffers);
router.get('/:id', authenticate, authorizeRoles('buyer','seller'),  getOfferById); 
router.put('/:id', authenticate, authorizeRoles('seller'), updateOffer);
router.delete('/:id',authenticate, authorizeRoles('seller'), deleteOffer);



export default router;

