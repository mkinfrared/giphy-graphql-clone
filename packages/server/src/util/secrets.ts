import dotenv from "dotenv";
dotenv.config();

console.log(process.env.NODE_ENV);

export const NODE_ENV = process.env.NODE_ENV;
