import express from "express";
import { verifyTokenForRole } from "../middleware/verifyTokenForRole.js";
import { AuthorizeRoles } from "../middleware/AuthorizeRoles.js";


const router = express.Router();
router.get("/admin", verifyTokenForRole, AuthorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin Route" });
});


router.get("/seller", verifyTokenForRole, AuthorizeRoles("admin", "seller"), (req, res) => {
  res.json({ message: "Seller Route" });
});

router.get("/buyer", verifyTokenForRole, AuthorizeRoles("admin", "seller", "buyer"), (req, res) => {
  res.json({ message: "Buyer Route" });
});

export default router;
