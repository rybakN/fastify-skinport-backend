import { config } from "dotenv";

config();

export const dbUser = process.env.DB_USER;
export const dbHost = process.env.DB_HOST;
export const dbPassword = process.env.DB_PASSWORD;
export const dbPort = +process.env.DB_PORT! || 5432;
export const dbName = process.env.DB_DATABASE;
export const appPort = process.env.APP_PORT;
export const appHost = process.env.APP_HOST;
