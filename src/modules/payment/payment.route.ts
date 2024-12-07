import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

router.post('/', PaymentController.createPayment);
router.get('/:paymentId', PaymentController.getPaymentDetails);

export const PaymentRoutes = router;
