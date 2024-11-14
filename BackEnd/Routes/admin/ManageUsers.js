import express from "express";
import {
  getAllUsers,
  selectSellers,
  selectBuyers,
  selectModerators,
  updateUserProfile,
  displayUserProfile,
  banUsers,
  unbanUsers,
} from "../../Controllers/admin/adminController.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();
router.get(
  "/moderators",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  selectModerators
);
router.get(
  "/sellers",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  selectSellers
);
router.get(
  "/buyers",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  selectBuyers
);

router.put(
  "/edit-user/:id",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  updateUserProfile
);

router.get(
  "/display-user/:id",
  displayUserProfile
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
