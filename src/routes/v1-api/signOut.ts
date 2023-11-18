import express from "express";

const router = express.Router();

router.post("/signout", (req, res) => {
  // Clear the cookie from the browser using cookieSession middleware
  req.session = null;

  res.status(200).send({ status: "Signed out." });
});

export { router as signOutRouter };
