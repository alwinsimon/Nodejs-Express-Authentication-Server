import dotenv from "dotenv";
// Initialize the environment variables from .env file
dotenv.config();

import mongoose from "mongoose";

import logger from "./config/logger";

import { app } from "./app";

const startServer = async () => {
  // Check if ENV Variables exist
  if (!process.env.APPLICATION_NAME) {
    throw new Error(`APPLICATION_NAME must be defined !!!`);
  }
  if (!process.env.PORT) {
    throw new Error(`PORT must be defined !!!`);
  }
  if (!process.env.NODE_ENV) {
    throw new Error(`NODE_ENV must be defined !!!`);
  }
  if (!process.env.JWT_KEY) {
    throw new Error(`JWT_KEY must be defined !!!`);
  }
  if (!process.env.JWT_TOKEN_DURATION) {
    throw new Error(`JWT_TOKEN_DURATION must be defined !!!`);
  }
  if (!process.env.MONGO_DB_URI) {
    throw new Error(`MONGO_DB_URI must be defined !!!`);
  }

  if (!logger) {
    console.error("Logger not initialized.");
    return;
  }
  // Log the server starting info
  logger.info("Starting-up Server.");

  const PORT = process.env.PORT || 3000;
  const SERVICE_NAME = process.env.APPLICATION_NAME;

  try {
    // ========================Connecting to Auth DB========================
    const dbConnection = await mongoose.connect(process.env.MONGO_DB_URI);

    console.log(
      `Connected to ${SERVICE_NAME} MongoDB successfully with host as: ${dbConnection.connection.host} !!!!!`
    );

    // Log the DB connection info
    logger.info(
      `Connected to ${SERVICE_NAME} MongoDB successfully with host as: ${dbConnection.connection.host}`
    );
  } catch (err) {
    console.error(`Error Connecting to ${SERVICE_NAME} DB:`, err);

    // Save the error log
    logger.error(`Error Connecting to ${SERVICE_NAME} DB:`, err);
  }

  // ========================Starting Auth Server========================
  app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} listening on PORT: ${PORT} !!!!!`);

    // Log the successful server starting info
    logger!.info(`Successfully Started ${SERVICE_NAME} on PORT: ${PORT}`);
  });
};

startServer();
