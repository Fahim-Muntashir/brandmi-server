import dotenv from 'dotenv';

// Load .env file contents into process.env
dotenv.config();

// Export the environment variables
export const config = {
    mongodb_url: process.env.mongodb_url,
    port: process.env.port,
    FRONTED_HOST: process.env.FRONTED_HOST,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_EXPIRED: process.env.ACCESS_TOKEN_EXPIRED,
    REFRESH_TOKEN_EXPIRED: process.env.REFRESH_TOKEN_EXPIRED,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.callbackURL


};
