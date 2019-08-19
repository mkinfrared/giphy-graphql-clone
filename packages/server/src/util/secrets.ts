import dotenv from "dotenv";
dotenv.config();

console.log(process.env.NODE_ENV);

export const NODE_ENV = process.env.NODE_ENV;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const REDIS_HOST = process.env.REDIS_HOST;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SERVER_PORT = process.env.SERVER_PORT;
export const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
export const GIPHY_KEY = process.env.GIPHY_KEY;
