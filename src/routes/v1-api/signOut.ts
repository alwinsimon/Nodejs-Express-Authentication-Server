import express from "express";
import destroyToken from "../../utils/v1-api-utils/destroyToken";

const router = express.Router();

router.post("/signout", (req, res) => {
  // Clear the cookie from the browser using destroyToken utils.
  destroyToken(res);

  res.status(200).send({ status: "Signed out." });
});

export { router as signOutRouter };
