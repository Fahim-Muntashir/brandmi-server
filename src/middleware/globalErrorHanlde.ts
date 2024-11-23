/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// Custom error class for operational errors
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Interface for standardized error response
export interface ErrorResponse {
    success: boolean;
    statusCode: number;
    message: string;
    stack?: string;
}

// Error handler middleware
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let errorResponse: ErrorResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal Server Error'
    };

    // Development vs Production error response
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Handle AppError (known operational errors)
    if (err instanceof AppError) {
        errorResponse = {
            success: false,
            statusCode: err.statusCode,
            message: err.message,
            ...(isDevelopment && { stack: err.stack })
        };
    }







    // Send error response
    res.status(errorResponse.statusCode).json(errorResponse);
};



