import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";
export const databaseConnect = async()=>{
    try {
      const url = MONGO_URL
    await mongoose.connect(
        url
      );
    } catch (error) {
      setTimeout(()=>{databaseConnect();},5000)
    }
}
export const db = mongoose.Connection;