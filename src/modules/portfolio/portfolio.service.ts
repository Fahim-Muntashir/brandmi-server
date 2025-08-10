import { Portfolio, IPortfolio } from "./portfolio.model";

export const PortfolioService = {
  createPortfolio: async (data: IPortfolio) => {
    const portfolioItem = new Portfolio(data);
    return await portfolioItem.save();
  },

  getPortfolioById: async (id: string) => {
    const portfolioItem = await Portfolio.findById(id);
    if (!portfolioItem) throw new Error("Portfolio item not found");
    return portfolioItem;
  },

  getPortfoliosBySellerId: async (sellerId: string) => {
    return await Portfolio.find({ sellerId });
  },

  updatePortfolio: async (id: string, updates: Partial<IPortfolio>) => {
    const updated = await Portfolio.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated) throw new Error("Portfolio item not found");
    return updated;
  },

  deletePortfolio: async (id: string) => {
    const deleted = await Portfolio.findByIdAndDelete(id);
    if (!deleted) throw new Error("Portfolio item not found");
    return deleted;
  },
};
