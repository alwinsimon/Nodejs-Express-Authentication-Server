import express from "express";
import { currentUser } from "base-auth-handler";

const router = express.Router();

router.get("/currentuser", currentUser, (req, res) => {
  if (req.currentUser === undefined) {
    // No valid JWT was supplied in request cookies.
    res.status(207).send({ currentUser: null });
  } else {
    res.status(200).send({ currentUser: req.currentUser });
  }
});

export { router as currentUserRouter };
