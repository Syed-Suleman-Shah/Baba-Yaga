import React, { useState } from 'react';
import './productstyle.css';

function DeleteCategory({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  // Handle category deletion
  const handleDelete = () => {
    if (!selectedCategory) {
      setMessage('Please select a category to delete.');
      return;
    }

    // Perform deletion logic here (e.g., API call to delete category from server)
    console.log(`Category deleted: ${selectedCategory}`);

    // After deletion, clear the selection and display a success message
    setMessage(`Category "${selectedCategory}" deleted successfully!`);
    setSelectedCategory('');
  };

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
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-control"
        >
          <option value="">-- Select a Category --</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleDelete} className="delete-button">
        Delete Category
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DeleteCategory;
