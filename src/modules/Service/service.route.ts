import express from 'express';
import { ServiceController } from './service.controller';

const router = express.Router();

// Create Service
router.post('/', ServiceController.createService);

// Get a specific Service
router.get('/:serviceId', ServiceController.getService);

// Get all Services
router.get('/', ServiceController.getAllServices);

// Update Service
router.put('/:serviceId', ServiceController.updateService);

// Soft Delete Service
router.delete('/:serviceId', ServiceController.deleteService);

export const ServiceRoutes = router;
