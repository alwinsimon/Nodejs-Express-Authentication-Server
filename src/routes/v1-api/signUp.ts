import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";

import { validateRequest } from "base-auth-handler";
import { BadRequestError } from "base-error-handler";
import generateToken from "../../utils/v1-api-utils/generateToken";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Provide a valid Email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new BadRequestError("Email already exists.");
    }

    const user = User.build({ email: email, password: password });
    await user.save();

    // Generate JWT and add to res.cookies object
    generateToken(res, user.id, user.email);

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
