import React, { useState } from "react";
import "./productstyle.css"; // Ensure this file has your custom styles

export const AddCategoriesForm = ()=> {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [error, setError] = useState("");
  const [isSubCategoryRequired, setIsSubCategoryRequired] = useState(false);
  const [currentView, setCurrentView] = useState('categories');  

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }
 
    if (isSubCategoryRequired && !subCategoryName.trim()) {
      setError("Subcategory name is required");
      return;
    }

    const newCategory = {
      name: categoryName,
      description,
      subCategory: isSubCategoryRequired ? subCategoryName : null,
    };

    console.log("New Category:", newCategory);
    setCategoryName("");
    setDescription("");
    setSubCategoryName("");
    setIsSubCategoryRequired(false);
    setError("");
    alert("Category added successfully!");
  };

  const handleAddSubCategory = () => {
    setIsSubCategoryRequired(true);
  };

  return (
    <div className="add-category-form">
      {currentView === 'categories' && (
        <form onSubmit={handleSubmit}>
          <h3>Add Category</h3>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Submit</button>
        </form>
      )}
   
    </div>
  );
}

export const AddSubCategoriesForm = () => {
  const [parentCategory, setParentCategory] = useState(""); 
  const [description, setDescription] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [error, setError] = useState("");
  const [isSubCategoryRequired, setIsSubCategoryRequired] = useState(false);
  const [currentView, setCurrentView] = useState("categories");

  const parentCategories = ["Electronics", "Clothing", "Books", "Furniture"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!parentCategory) {
      setError("Parent category is required");
      return;
    }

    if (!subCategoryName.trim()) {
      setError("Subcategory name is required");
      return;
    }

    const newSubCategory = {
      parentCategory,
      description,
      subCategoryName,
    };

    console.log("New SubCategory:", newSubCategory);

    setParentCategory("");
    setDescription("");
    setSubCategoryName("");
    setError("");
    alert("Subcategory added successfully!");
  };

  return (
    <div className="add-category-form">
      {currentView === "categories" && (
        <form onSubmit={handleSubmit}>
          <h3>Add SubCategory</h3>

          <div className="form-group">
            <label>Parent Category</label>
            <select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="">Select parent category</option>
              {parentCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subcategory Name</label>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter subcategory name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter subcategory description"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

