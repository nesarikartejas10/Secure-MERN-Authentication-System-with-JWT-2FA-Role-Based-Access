import mongoose from "mongoose";
import { config } from "./envConfig.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("DB connect successfully");
  } catch (error) {
    console.log("Failed to connect DB:-", error.message);
    process.exit(1);
  }
};

export default connectDB;
