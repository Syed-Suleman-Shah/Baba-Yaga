import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../Controllers/authenticationController.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forget-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logout);
export default router;
