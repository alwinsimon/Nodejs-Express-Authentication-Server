import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { validateRequest } from "base-auth-handler";
import { BadRequestError } from "base-error-handler";

import { User } from "../../models/user";
import { Password } from "../../utils/v1-api-utils/password";
import generateToken from "../../utils/v1-api-utils/generateToken";

const router = express.Router();

router.post(
  "/signin",
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

    // Generate JWT and add to res.cookies object
    generateToken(res, existingUser.id, existingUser.email);

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
