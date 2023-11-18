import dotenv from 'dotenv';
import mongoose from "mongoose";

// Initialize the environment variables from .env file
dotenv.config();

import { app } from "./app";

const startServer = async () => {
  const PORT = 3000;
  const SERVICE_NAME = "AUTH SERVER";

  // Check if ENV Variables exist
  if (!process.env.JWT_KEY) {
    throw new Error(`JWT_KEY must be defined in ${SERVICE_NAME} SERVICE !!!`);
  }
  if (!process.env.MONGO_DB_URI) {
    throw new Error(
      `MONGO_DB_URI must be defined in ${SERVICE_NAME} SERVICE !!!`
    );
  }

  try {
    // ========================Connecting to Auth DB========================
    const dbConnection = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Connected to ${SERVICE_NAME} MongoDB successfully with host as: ${dbConnection.connection.host} !!!!!`);
  } catch (err) {
    console.error(`Error Connecting to ${SERVICE_NAME} DB:`, err);
  }

  // ========================Starting Auth Server========================
  app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} SERVICE listening on PORT: ${PORT} !!!!!`);
  });
};

startServer();
