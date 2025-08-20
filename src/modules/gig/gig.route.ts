import express from "express";
import { gigController } from "./gig.controller";
import { upload } from "../../middleware/upload";

const router = express.Router();

// Create Service
router.post("/", upload.array("images"), gigController.createService);

// Get a specific Service
router.get("/:serviceId", gigController.getService);

// Get all gIGS
router.get("/", gigController.getAllServices);

// Update Service
router.put("/:serviceId", gigController.updateService);

// Get all services by seller
router.get("/sellergigs/:sellerId", gigController.getGigsBySeller);

// Soft Delete Service
router.delete("/:serviceId", gigController.deleteService);

// Change gig status
router.patch("/:gigId/status", gigController.changeGigStatus);

export const gigRoutes = router;
