import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@bookmyseat/common";

import { User } from "../models/user";
import { Password } from "../utils/password";

const router = express.Router();

router.post(
  "/api/v1/signin",
  [
    body("email").isEmail().withMessage("Provide a valid email."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("A password must be provided."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials.");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials.");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store JWT on session object (for cookie-session middleware to create a cookie with jwt)
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
