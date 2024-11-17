import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./productstyle.css";
import { useAdminService } from "../../services/adminServices";

export const Del_C = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const { deleteSubCategories, displayCategories } = useAdminService();
  const token = sessionStorage.getItem("token");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [confirmationName, setConfirmationName] = useState(""); // State for the subcategory name input

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

  const handleDelete = async () => {
    if (!subCategoryId) {
      setMessage("Please select a subcategory to delete.");
      return;
    }

    if (confirmationName.trim() !== subCategoryName.trim()) {
      setMessage("Subcategory name does not match.");
      return;
    }

    try {
      const response = await deleteSubCategories(token, confirmationName, categoryId,subCategoryId);
      console.log("Response:", response);
      setMessage("Subcategory deleted successfully!");
      setSubCategoryId("");
      setSubCategoryName("");
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      setMessage("Failed to delete subcategory.");
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);
    setSubCategoryId("");
    setSubCategoryName("");
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setSubCategoryId(selectedSubCategoryId);

    const subCategory = categories
      .find((category) => category._id === categoryId)
      ?.subcategories.find((sub) => sub._id === selectedSubCategoryId);

    if (subCategory) {
      setSubCategoryName(subCategory.name);
    }

    setShowModal(true);
    setConfirmationName("");
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <div className="edit-category-form">
      {/* Category selection */}
      <div className="form-group">
        <label>Select Category</label>
        <select value={categoryId} onChange={handleCategoryChange}>
          <option value="">Select parent category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory selection */}
      {categoryId && (
        <div className="form-group">
          <label>Select Subcategory</label>
          <select value={subCategoryId} onChange={handleSubCategoryChange}>
            <option value="">Select subcategory</option>
            {categories
              .find((category) => category._id === categoryId)
              ?.subcategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Modal for subcategory deletion */}
      {showModal && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete the "<strong>{subCategoryName}</strong>" subcategory?
            </p>
            <input
              type="text"
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
              placeholder="Enter subcategory name to confirm"
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};
