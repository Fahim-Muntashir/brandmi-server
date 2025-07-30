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

// // Connect to MongoDB
// const connectDB = async () => {
//     try {
<<<<<<< HEAD
//         await mongoose.connect(config.mongodb_url as string);
=======
//         db.
>>>>>>> 22e9411d283a8fec892d1fa3a25f4f77a027541c
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         process.exit(1); // Exit process with failure
//     }
// };



<<<<<<< HEAD
// // Start the server and connect database
// const startServer = async () => {
//     await connectDB(); // Wait for database connection
//     app.listen(config.port, () => {
//         console.log(`Server is running on port ${config.port}`);
//     });
// };
// startServer()
=======
// Start the server and connect database
const startServer = async () => {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
};
startServer()
>>>>>>> 22e9411d283a8fec892d1fa3a25f4f77a027541c
