import express from "express";
import {
  addCategory,
  addSubCategory,
  getCategories,
  getSubCategories,
  editCategories,
  editSubCategories,
  deleteCategory,
  deleteSubategory,
} from "../../controller/admin/category.controller.js";
import { AuthorizeRoles } from "../../middleware/AuthorizeRoles.js";
import { verifyTokenForRole } from "../../middleware/verifyTokenForRole.js";

const router = express.Router();
router.post(
  "/add-category",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  addCategory
);

router.post(
  "/add-Subcategory",
  verifyTokenForRole,
  AuthorizeRoles("admin"),
  addSubCategory
);

router.get(
  "/view-categories",
  verifyTokenForRole,
  AuthorizeRoles("admin", "seller"),
  getCategories
);
router.get("/view-Subcategories/:id", getSubCategories);

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
