import React, { useState, useEffect } from "react";
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";
export const EditCategoriesForm = () => {
  const [categories, setCategories] = useState([]);  
  const [CategoryId, setCategoryId] = useState(""); 
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const {EditCategoriesForm, displayCategories } = useAdminService();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await displayCategories(token);
      setCategories(fetchedCategories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!CategoryId) {
      setMessage("Parent category is required");
      return;
    }
    if (!CategoryName.trim()) {
      setMessage("Subcategory name is required");
      return;
    }
    try {
      await EditCategoriesForm(token, CategoryId, CategoryName, description);
      setMessage("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding subcategory:", err);
      setMessage("Failed to add subcategory");
    }
  };
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryName("");
    setDescription("");
    setMessage("");
  };
  return (
    <div className="add-category-form">
      <div className="form-group">
        <label>Select Category</label>
        <select value={CategoryId} onChange={handleCategoryChange}>
          <option value="">Select parent category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {CategoryId && (
        <form onSubmit={handleSubmit}>
          <h3>Add SubCategory</h3>
          <div className="form-group">
            <label>Subcategory Name</label>
            <input
              type="text"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
          {message && <p className="message">{message}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};


