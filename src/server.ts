// import mongoose from "mongoose";
// import { config } from "./config";
// import app from "./app";


// const main = async () => {
//     try {
//         // 1. Connect to the database
//         console.log("running")

//         // await mongoose.connect(config.mongodb_url as string);
//         // console.log('✅ Database connected successfully!');

//         // 2. Start the server only after the database is connected
//         app.listen(config.port || 5000, () => {
//             console.log("hi");

//             console.log(`🚀 Server is running on port ${config.port}|| 5000}`);
//         });
//     } catch (error) {
//         console.error('🔥 Failed to start the server:', error);
//         process.exit(1); // Exit process with failure
//     }
// };

// // Start the application
// main()