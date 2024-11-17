import express from "express";
import {
  cresteCagory,
  createSubCategory,
  getAllSubCategories,
  editCategories,
  deleteCategory,
  deleteSubategory,
  editSubCategories,
  getAllCategories,
} from "../../Controllers/admin/adminController.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();
router.post(
  "/add-category",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  cresteCagory
);

router.post(
  "/add-Subcategory",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  createSubCategory
);

router.get(
  "/view-categories",
  verifyTokenForRole,
  AuthorizeRoles("admin", "seller"),
  getAllCategories
);
router.get("/view-Subcategories/:id", getAllSubCategories);

router.put(
  "/edit-category/:id",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  editCategories
);

router.put(
  "/edit-subcategory",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  editSubCategories
);
router.delete(
  "/delete-category",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  deleteCategory
);
router.delete(
  "/delete-subcategory",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  deleteSubategory
);

export default router;
