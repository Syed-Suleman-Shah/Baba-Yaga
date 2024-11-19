import express from "express";
import {
  getAllUsers,
  getSellers,
  getBuyers,
  getModerators,
  editUserProfile,
  displayUserProfile,
  banUsers,
  unbanUsers,
} from "../../controller/admin/user.controller.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();

router.get(
  "/moderators",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  getModerators
);
router.get("/sellers", verifyTokenForRole, AuthorizeRoles("admin"), getSellers);
router.get("/buyers", verifyTokenForRole, AuthorizeRoles("admin"), getBuyers);
router.get("/display-user/:id", displayUserProfile);

router.put(
  "/edit-user/:id",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  editUserProfile
);

router.put(
  "/ban-user/:id",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  banUsers
);

router.put(
  "/unban-user/:id",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  unbanUsers
);

export default router;
