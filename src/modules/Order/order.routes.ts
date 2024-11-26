import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// Create Order
router.post('/', OrderController.createOrder);

// Get Order by ID
router.get('/:orderId', OrderController.getOrder);

// Get All Orders
router.get('/', OrderController.getAllOrders);

// Update Order
router.patch('/:orderId', OrderController.updateOrder);

export const OrderRoutes = router;
