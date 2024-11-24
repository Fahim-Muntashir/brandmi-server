import { Router } from "express";
import { BuyerProfileControllers } from "./buyerProfile.controllers";

const router = Router()

router.post("/create-buyer", BuyerProfileControllers.createBuyer)

// get single buyer
router.get("/:buyerId", BuyerProfileControllers.getSingleBuyerProfile)

// get all buyer
router.get("/", BuyerProfileControllers.getAllBuyerProfile)

// update buyer
router.put("/:buyerId", BuyerProfileControllers.updateBuyerProfile)

// delete buyer
router.delete("/:buyerId", BuyerProfileControllers.deleteBuyerProfile)

export const BuyerProfileRoutes = router