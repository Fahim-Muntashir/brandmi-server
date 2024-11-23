/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import mongoose from 'mongoose';
import { config } from './config';
import { errorHandler } from './middleware/globalErrorHanlde';
import { UserRoute } from './modules/user/user.routes';
import { GoogleRoute } from './modules/google/google.routes';
import { AuthRoutes } from './modules/auth/auth.routes';

const app: Application = express();




// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", // Your Next.js frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // Allow cookies to be sent
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Routes
app.use("/api/user", UserRoute)
app.use("/api/auth", AuthRoutes)
app.use("/auth/google", GoogleRoute);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});




// global error
app.use(errorHandler)

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb_url as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};



// Start the server and connect database
const startServer = async () => {
    await connectDB(); // Wait for database connection
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
};
startServer()
