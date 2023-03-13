import * as dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SALT = process.env.JWT_SALT;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_KEY = process.env.CLOUD_KEY;
export const CLOUD_SECRET = process.env.CLOUD_SECRET;


