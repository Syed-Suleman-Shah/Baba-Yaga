import express from "express";
import { getAllUsers , selectSellers , selectBuyers , selectModerators} from "../../Controllers/admin/adminController.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();

// Admin Management -> View Users -> 1) viewSellers -> 2) viewBuyers
// router.get("/users", verifyTokenForRole, AuthorizeRoles("admin"), getAllUsers);
router.get("/moderators", verifyTokenForRole, AuthorizeRoles("admin"), selectModerators);
router.get("/sellers", verifyTokenForRole, AuthorizeRoles("admin"), selectSellers);
router.get("/buyers", verifyTokenForRole, AuthorizeRoles("admin"), selectBuyers);
export default router;
