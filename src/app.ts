import express from "express";
import "express-async-errors"; // Package used to handle async errors
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "base-error-handler";

import v1APIs from "./routes/v1-routes";

const app = express();

// Configuring express app to trust proxied requests from ingress-nginx.
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false, // To keep the data inside cookie un-encrypted.
    secure:
      process.env.NODE_ENV !== "development" /* To keep it a https only cookie.
    The value will be false in development environment to allow sending cookie over http also.*/,
  })
);

//? ===================== Application Home Route =====================
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({status: `${process.env.APPLICATION_NAME} and Systems are Up & Running.`});
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
