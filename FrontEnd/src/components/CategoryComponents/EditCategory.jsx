import React, { useState } from 'react';
import data from '../../mockJsons/productData.json';
import './productstyle.css';

function EditCategory() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCategoryChange = (e) => {
    const category = data.find((cat) => cat.id === e.target.value);
    setSelectedCategory(category);
    setCategoryName(category ? category.name : '');
    setDescription(category ? category.description : '');
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    // Update the category details
    const updatedCategory = {
      ...selectedCategory,
      name: categoryName,
      description,
    };

    console.log('Updated Category:', updatedCategory);

    // Display success message instead of page reload
    setSuccessMessage(`Category "${categoryName}" updated successfully!`);
    setError('');
  };

  return (
    <div className="edit-category-container">
      <h2 className="edit-category-title">Edit Category</h2>
      <form className="edit-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Category:</label>
          <select
            className="form-input"
            value={selectedCategory.id || ''}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <>
            <div className="form-group">
              <label className="form-label">Category Name:</label>
              <input
                className="form-input"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Edit category name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Edit description (optional)"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="form-submit-btn" type="submit">
              Update Category
            </button>

            {successMessage && <p className="success-message">{successMessage}</p>}
          </>
        )}
      </form>
    </div>
  );
}

export default EditCategory;
