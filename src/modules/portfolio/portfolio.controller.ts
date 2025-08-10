import { Request, Response } from "express";
import { PortfolioService } from "./portfolio.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

export const PortfolioController = {
  createPortfolio: catchAsync(async (req: Request, res: Response) => {
    const portfolio = await PortfolioService.createPortfolio(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  }),

  getPortfolioById: catchAsync(async (req: Request, res: Response) => {
    const portfolio = await PortfolioService.getPortfolioById(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Portfolio fetched successfully",
      data: portfolio,
    });
  }),

  getPortfoliosBySellerId: catchAsync(async (req: Request, res: Response) => {
    const portfolios = await PortfolioService.getPortfoliosBySellerId(
      req.params.sellerId
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Portfolios fetched successfully",
      data: portfolios,
    });
  }),

  updatePortfolio: catchAsync(async (req: Request, res: Response) => {
    const updatedPortfolio = await PortfolioService.updatePortfolio(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio,
    });
  }),

  deletePortfolio: catchAsync(async (req: Request, res: Response) => {
    const deletedPortfolio = await PortfolioService.deletePortfolio(
      req.params.id
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Portfolio deleted successfully",
      data: deletedPortfolio,
    });
  }),
};
