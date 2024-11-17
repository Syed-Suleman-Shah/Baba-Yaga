import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";

export const AddCategoriesForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { AddCategoriesForm, isloading } = useAdminService();
  const token = sessionStorage.getItem("token");

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError("Category name is required");
      return;
    }
    await AddCategoriesForm(token, categoryName, description);
    setCategoryName("");
    setDescription("");
    setError("");
  };

  return (
    <div className="add-category-form">
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
    </div>
  );
};

export const AddSubCategoriesForm = () => {
  const [categories, setCategories] = useState([]); // List of parent categories
  const [parentCategoryId, setParentCategoryId] = useState(""); // Selected parent category ID
  const [subCategoryName, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { AddSubCategoriesForm, displayCategories,isloading } = useAdminService();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    fetchCategories();  
  }, []);
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await displayCategories(token); 
      setCategories(fetchedCategories || []); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parentCategoryId) {
      setError("Parent category is required");
      return;
    }
    if (!subCategoryName.trim()) {
      setError("Subcategory name is required");
      return;
    }
   await AddSubCategoriesForm(token, subCategoryName, description,parentCategoryId);
    setSubCategoryName("");
    setDescription("");
    setError("DONE!");

  };
  return (
    <div className="add-category-form">
      <form onSubmit={handleSubmit}>
        <h3>Add SubCategory</h3>
        <div className="form-group">
          <label>Parent Category</label>
          <select
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option value="">Select parent category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
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
    </div>
  );
};
