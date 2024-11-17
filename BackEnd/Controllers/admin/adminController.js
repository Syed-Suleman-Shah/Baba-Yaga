import { User } from "../../Models/userAuthentication.js";
import { Category, SubCategory } from "../../Models/Category.js";
import mongoose from "mongoose";
// User Management -> View Users -> 1) viewSellers -> 2 viewBuyers
export const selectSellers = async (req, res, next) => {
  try {
    const sellers = await User.find({
      $or: [
        { role: { $in: ["seller", "Seller"] } },
        { originalRole: { $in: ["seller", "Seller"] } },
      ],
    });

    res.json({ sellers });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ message: "Error fetching sellers", error });
  }
};

export const selectBuyers = async (req, res, next) => {
  try {
    const buyers = await User.find({
      $or: [
        { role: { $in: ["buyer", "Buyer"] } },
        { originalRole: { $in: ["buyer", "Buyer"] } },
      ],
    });
    res.json({ buyers });
  } catch (error) {
    next(error);
  }
};
export const selectModerators = async (req, res, next) => {
  try {
    const moderators = await User.find({
      $or: [
        { role: { $in: ["moderator", "Mderator"] } },
        { originalRole: { $in: ["moderator", "Moderator"] } },
      ],
    });
    res.json({ moderators });
  } catch (error) {}
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

// Edit User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(JSON.stringify(user));
    const { name, email, role } = req.body;
    user.name = name;
    user.email = email;
    user.role = role;

    await user.save(); // Save the updated user

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const userRoleAssignment = async (req, res) => {
  try {
    const { email, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const allowedRoles = ["admin", "seller", "buyer"];
    if (allowedRoles.includes(user.role.toLowerCase())) {
      user = await User.findByIdAndUpdate(user._id, { role }, { new: true });

      res.json({ success: true, message: "Role updated successfully", user });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to change roles",
      });
    }
  } catch (error) {
    console.error("Error in user Role Assignment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const displayUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// banUsers
export const banUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.originalRole = user.role;
    user.role = "banned";
    user.isBanned = true;
    await user.save();
    console.log("User banned successfully");
    res.json({
      success: true,
      message: "User banned successfully",
      user: { ...user },
    });
  } catch (error) {
    console.error("Error in banUsers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// unban Users
export const unbanUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const originalRole = user.originalRole;
    user.role = user.originalRole;
    console.log("User unbanned successfully", originalRole);
    user.isBanned = false;

    await user.save();

    res.json({
      success: true,
      message: "User unbanned successfully",
      user,
    });
  } catch (error) {
    console.error("Error in unbanUsers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Manage Categories

export const cresteCagory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(name, description);
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.json({ message: "New category created successfully", newCategory });
  } catch (error) {
    console.error("Error in cresteCagory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// create a subCategory
export const createSubCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;

    // Validate required fields
    if (!parentCategory) {
      return res.status(400).json({
        success: false,
        message: "Parent category is required.",
      });
    }
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required.",
      });
    }

    // Find the parent category
    const parentCategoryObj = await Category.findById(parentCategory);
    if (!parentCategoryObj) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found.",
      });
    }

    // Create and save the new subcategory
    const newSubCategory = new SubCategory({
      name,
      description,
      parentCategory,
    });
    const savedSubCategory = await newSubCategory.save();

    // Add the new subcategory to the parent category's subcategories array
    parentCategoryObj.subcategories.push(savedSubCategory);
    await parentCategoryObj.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "New subcategory created successfully.",
      subcategory: savedSubCategory,
    });
  } catch (error) {
    console.error("Error in createSubCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// getAllcategories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get all sub categories
export const getAllSubCategories = async (req, res) => {
  try {
    const parentCategory = req.params.id;
    if (!parentCategory) {
      return res
        .status(400)
        .json({ success: false, message: "parentCategory is required" });
    }

    const parentCategoryObj = await Category.findById(parentCategory).populate(
      "subcategories"
    );
    res.json({ subcategories: parentCategoryObj });
  } catch (error) {
    console.error("Error in getAllSubCategories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// editCategories
export const editCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    updatedCategory.save();
    res.json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error("Error in editCategories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// editSubCategories

export const editSubCategories = async (req, res) => {
  try {
    const { subCategoryId, id, name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required.",
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found.",
      });
    }
    const subCategory = category.subcategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found within the parent category.",
      });
    }
    subCategory.name = name;
    subCategory.description = description;
    await category.save();
    res.json({
      success: true,
      message: "Subcategory updated successfully.",
      subcategory: subCategory,
    });
  } catch (error) {
    console.error("Error in editSubCategories:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
// deleteCategories
export const deleteCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const deletedCategory = await Category.findById(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    console.log("category id: " + categoryId);
    console.log("category name: " + name);
    if (
      deletedCategory.subcategories.length > 0 &&
      name === deletedCategory.name
    ) {
       await Category.findByIdAndDelete(categoryId);
      console.log("Category deleted successfully: ", deletedCategory);
      return res.json({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      if(!deleteCategory){
        return res.status(400).json({success: false, message: "Name mismatch"});
      }
      if(deleteCategory){
        await Category.findByIdAndDelete(categoryId);
        return res.json({success: true, message: "Category deleted successfully"});
      }
    }
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteSubategory = async (req, res) => {
  try {
    const { name, categoryId, subcategoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    console.log("Category ID:", categoryId);
    console.log("Subcategory ID:", subcategoryId);
    console.log("Subcategory Name:", name);
    const subcategory = category.subcategories.find(
      (sub) =>
        sub._id.toString() === subcategoryId &&
        sub.name.toLowerCase() === name.toLowerCase()
    );

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found or name mismatch",
      });
    }

    category.subcategories = category.subcategories.filter(
      (sub) => sub._id.toString() !== subcategoryId
    );

    await category.save();

    console.log("Subcategory deleted successfully:", subcategory);
    res.json({ success: true, message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSubcategory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
