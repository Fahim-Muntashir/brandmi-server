import express from "express";
import { PortfolioController } from "./portfolio.controller";

const router = express.Router();

router.post("/", PortfolioController.createPortfolio);
router.get("/:id", PortfolioController.getPortfolioById);
router.get("/seller/:sellerId", PortfolioController.getPortfoliosBySellerId);
router.put("/:id", PortfolioController.updatePortfolio);
router.delete("/:id", PortfolioController.deletePortfolio);

export const PortfolioRoutes = router;
