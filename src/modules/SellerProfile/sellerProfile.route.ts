import express from "express";
import { SellerProfileController } from "./sellerProfile.controller";

const router = express.Router();

router.post("/", SellerProfileController.createSellerProfile);
router.get("/", SellerProfileController.getAllSellerProfiles);
router.get("/:sellerId", SellerProfileController.getSellerProfile);
router.patch("/:sellerId", SellerProfileController.updateSellerProfile);
router.delete("/:sellerId", SellerProfileController.deleteSellerProfile);

export const SellerProfileRoutes = router;
