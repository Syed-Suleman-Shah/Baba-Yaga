import { Category, SubCategory } from "../../model/category.model.js";

export const addCategory = async (req, res) => {
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
export const addSubCategory = async (req, res) => {
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
export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.json({ categories });
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


  //get all sub categories
export const getSubCategories = async (req, res) => {
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
  