import { Router } from "express";
import { BuyerControllers } from "./buyerProfile.controllers";

const router = Router()

router.post("/create-buyer", BuyerControllers.createBuyer)

export const BuyerProfileRoutes = router