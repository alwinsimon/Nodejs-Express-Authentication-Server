import express from "express";
import { currentUser } from "base-auth-handler";

const router = express.Router();

router.get("/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
