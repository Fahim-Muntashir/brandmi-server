/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { config } from './config';
import { errorHandler } from './middleware/globalErrorHandler';

import { applicationRoutes } from './routes';

export const app: Application = express();

const corsOptions = {
    origin: config.FRONTED_HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use("/api/v1", applicationRoutes);



// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});




// global error
app.use(errorHandler)

// Connect to MongoDB




// Start the server and connect database

