import express from "express";
import { currentUser, requireAuth } from "base-auth-handler";
import destroyToken from "../../utils/v1-api-utils/destroyToken";

const router = express.Router();

router.post("/signout", currentUser, requireAuth, (req, res) => {
  // Clear the cookie from the browser using destroyToken utils.
  destroyToken(res);

  res.status(200).send({ status: "Signed out." });
});

export { router as signOutRouter };
