import express from "express";
import "express-async-errors"; // Package used to handle async errors
import { json } from "body-parser";

import cookieParser from "cookie-parser";

import { errorHandler, NotFoundError } from "base-error-handler";

import morganLogger from "./logger/HTTP-request-logger";

import v1APIs from "./routes/v1-routes";

const app = express();

// Configuring express app to trust proxied requests from ingress-nginx.
app.set("trust proxy", true);

// Middleware to log all HTTP requests using morgan library
app.use(morganLogger());

app.use(json());

// CookieParser Middleware - will add cookies object to response object.
app.use(cookieParser());

//? ===================== Application Home Route =====================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: `${process.env.APPLICATION_NAME} and Systems are Up & Running.`,
  });
});

//? ===================== Routes Configuration =====================
app.use("/api/v1", v1APIs);

// Resource Not Found Error Configuration
app.all("*", () => {
  throw new NotFoundError();
});

// Custom Error Handler Configuration
app.use(errorHandler);

export { app };
