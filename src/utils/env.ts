import dotenv from "dotenv";

dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  API_PORT: process.env.API_PORT || 8080,
  API_PREFIX: process.env.API_PREFIX || "/api",
  JWT_SECRET: process.env.JWT_SECRET as string,
};
