import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";

import { validateRequest } from "base-auth-handler";
import { BadRequestError } from "base-error-handler";

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

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    // Store JWT on session object (for cookie-session middleware to create a cookie with jwt)
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
