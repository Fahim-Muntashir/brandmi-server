import { NextFunction, RequestHandler, Request, Response } from "express";

// Async handler wrapper to catch async errors
export const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
