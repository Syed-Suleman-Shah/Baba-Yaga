import React, { useState, useEffect } from "react";
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";
import { Modal, Button } from "react-bootstrap";  
export const Del_P = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);  
  const [categoryName, setCategoryName] = useState("");  
  const { displayCategories, deleteCategories } = useAdminService();
  const [confirmationName, setConfirmationName] = useState("");  
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await displayCategories(token);
      setCategory(fetchedCategories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) {
      setMessage("Please select a category to delete.");
      return;
    }

    try {
      console.log("confirmationName" ,confirmationName );
      await deleteCategories(token, confirmationName , selectedCategory);
      setMessage("Category deleted successfully!");
      setSelectedCategory("");
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage("Failed to delete category.");
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    const selectedCategoryObj = category.find(cat => cat._id === selectedCategoryId);    
    if (selectedCategoryObj) {
      setCategoryName(selectedCategoryObj.name); 
    }

    setShowModal(true);  
    setConfirmationName(""); 
  };

  const handleModalClose = () => setShowModal(false); 

  return (
    <div className="delete-category-container">
      <h2 className="delete-category-title">Delete Category</h2>

      <div className="form-group">
        <label htmlFor="category-select" className="form-label">
          Select Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="form-control"
        >
          <option value="">-- Select a Category --</option>
          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete "{categoryName}" category?
            </p>
            
            <input
              type="text"
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
              placeholder="Enter category name"
              className="form-control"
            />

            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};
