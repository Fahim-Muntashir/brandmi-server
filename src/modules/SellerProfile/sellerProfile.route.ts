import express from 'express';
import { SellerProfileController } from './sellerProfile.controller';

const router = express.Router();

// Add/Create SellerProfile
router.post('/', SellerProfileController.createSellerProfile);

// Get a specific SellerProfile
router.get('/:sellerId', SellerProfileController.getSellerProfile);

// Get all SellerProfiles
router.get('/', SellerProfileController.getAllSellerProfiles);

// Update SellerProfile
router.put('/:sellerId', SellerProfileController.updateSellerProfile);

// Soft delete SellerProfile
router.delete('/:sellerId', SellerProfileController.deleteSellerProfile);

export const SellerProfileRoutes = router;
