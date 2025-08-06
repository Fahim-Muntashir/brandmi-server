/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { errorHandler } from "./middleware/globalErrorHandler";

import { applicationRoutes } from "./routes";
import mongoose from "mongoose";

const app: Application = express();

const corsOptions = {
  origin: config.FRONTED_HOST,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", applicationRoutes);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

// global error
app.use(errorHandler);

const main = async () => {
  try {
    // 1. Connect to the database
    console.log("running");

    await mongoose.connect(config.mongodb_url as string);
    console.log("✅ Database connected successfully!");

    // 2. Start the server only after the database is connected
    app.listen(config.port || 5000, () => {
      console.log("hi");

      console.log(`🚀 Server is running on port ${config.port}|| 5000}`);
    });
  } catch (error) {
    console.error("🔥 Failed to start the server:", error);
    process.exit(1); // Exit process with failure
  }
};

main();
