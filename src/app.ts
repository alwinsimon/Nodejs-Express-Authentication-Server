import express from "express";
import "express-async-errors"; // Package used to handle async errors
import { json } from "body-parser";

import cookieParser from "cookie-parser";

import { errorHandler, NotFoundError } from "base-error-handler";

import morganLogger from "./config/logger/HTTP-request-logger";
import generateSwaggerDocs from "./config/API Documentation/swagger";

import apiRateLimiter from "./config/api-rate-limiter/api-rate-limiter";
import apiSpeedLimiter from "./config/api-rate-limiter/api-speed-limiter";

import { serverHealthCheck } from "./routes/general-api/server-health";
import v1APIs from "./routes/v1-routes";

const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();

// Middleware to log all HTTP requests using morgan library
app.use(morganLogger());

// Speed limiter for api calls. 
app.use(apiSpeedLimiter);

// Rate limiter for api calls. 
app.use(apiRateLimiter);

// Configuring express app to trust proxied requests from ingress-nginx.
app.set("trust proxy", true);

app.use(json());

// CookieParser Middleware - will add cookies object to response object.
app.use(cookieParser());

// Function to provide swagger documentation
generateSwaggerDocs(app, PORT as number);
// use GET '/api-docs' or GET '/api-docs.json' to view API docs.

//? ===================== Application Health Check Route =====================
app.get("/health", serverHealthCheck);

//? ===================== Routes Configuration =====================
// =====================V1 APIs Routes Configuration =================
app.use("/api/v1", v1APIs);

// Resource Not Found Error Configuration
app.all("*", () => {
  throw new NotFoundError();
});

// Custom Error Handler Configuration
app.use(errorHandler);

export { app };
