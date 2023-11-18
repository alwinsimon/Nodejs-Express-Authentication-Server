import express from "express";
import "express-async-errors"; // Package used to handle async errors
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@bookmyseat/common";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouter } from "./routes/signUp";


const app = express();

// Configuring express app to trust proxied requests from ingress-nginx.
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false, // To keep the data inside cookie un-encrypted.
    secure: process.env.NODE_ENV !== "test", /* To keep it a https only cookie.
    The value will be false in test environment to allow sending cookie over http also.*/
  })
);



app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// Resource Not Found Error Configuration
app.all("*", () => {
  throw new NotFoundError();
});

// Custom Error Handler Configuration
app.use(errorHandler);

export { app };
