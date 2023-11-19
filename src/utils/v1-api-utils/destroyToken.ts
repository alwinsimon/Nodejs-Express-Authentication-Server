import { Response } from "express";

const destroyToken = (res: Response) => {
  // Empty string to place in cookie instead of token
  const jwtToken = "";

  const cookieOptions = {
    httpOnly: true, // To prevent cookies from being accessed by client-side scripts
    secure: process.env.NODE_ENV !== "development", // Value will be false in the development environment and hence http will be allowed in development
    sameSite: "strict" as const,
    maxAge: 0, // Set maxAge to 0 milliseconds to expire the cookie immediately
  };

  res.cookie("jwt", jwtToken, cookieOptions);
};

export default destroyToken;
