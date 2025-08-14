import express from "express";
import { gigController } from "./gig.controller";
import { upload } from "../../middleware/upload";

const router = express.Router();

// Create Service
router.post("/", upload.array("images"), gigController.createService);

// Get a specific Service
router.get("/:serviceId", gigController.getService);

// Get all Services
router.get("/", gigController.getAllServices);

// Update Service
router.put("/:serviceId", gigController.updateService);

// Soft Delete Service
router.delete("/:serviceId", gigController.deleteService);

export const gigRoutes = router;
