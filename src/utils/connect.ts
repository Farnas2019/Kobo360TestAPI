import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/index";
import logger from "./logger";

async function connectDB() {
  const dbUri: string = config.mongo.host;

  try {
    await mongoose.connect(dbUri, config.mongo.options as ConnectOptions);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connectDB;
