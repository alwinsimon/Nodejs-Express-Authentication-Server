//? ===================================================== V1 Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

import { currentUserRouter } from "./v1-api/current-user";
import { signInRouter } from "./v1-api/signIn";
import { signOutRouter } from "./v1-api/signOut";
import { signUpRouter } from "./v1-api/signUp";

// ===================== Configuring Express Router =====================
const router = express.Router();

//* ==================== V1 Routes ====================

router.get("/currentuser", currentUserRouter);

router.post("/signin", signInRouter);

router.post("/signout", signOutRouter);

router.post("/signup", signUpRouter);

export default router;
