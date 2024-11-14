import React, { useState } from 'react';
import './productstyle.css'; // Ensure this file has your custom styles
import { AddCategoriesForm  , AddSubCategoriesForm }from './addCategoriesForm';
function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [error, setError] = useState('');
  const [isSubCategoryRequired, setIsSubCategoryRequired] = useState(false);
  const [currentView, setCurrentView] = useState('addCategory'); // State to toggle between add category and subcategory
  const [currentPage, setCurrentPage] = useState(0); // Page control for toggling views

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    // If subcategory is required but not provided, show an error
    if (isSubCategoryRequired && !subCategoryName.trim()) {
      setError('Subcategory name is required');
      return;
    }

    const newCategory = {
      name: categoryName,
      description,
      subCategory: isSubCategoryRequired ? subCategoryName : null,
    };

    console.log('New Category:', newCategory);

    // Clear the form after submission
    setCategoryName('');
    setDescription('');
    setSubCategoryName('');
    setIsSubCategoryRequired(false);
    setError('');
    alert('Category added successfully!');
  };

  const handleAddSubCategory = () => {
    setIsSubCategoryRequired(true);
    setCurrentView('addSubCategory'); // Switch to add subcategory view
  };

  return (
    <div className="add-category-form">
      <div className="tabs">
        <button onClick={() => { setCurrentView('AddCategoriesForm'); setCurrentPage(0); }}>Add Category</button>
        <button onClick={() => { setCurrentView('AddSubCategoriesForm'); setCurrentPage(0); }}>Add SubCategory</button>
      </div>

      {currentView === 'addCategory' && (
        <>

        </>
      )}
{currentView === 'AddCategoriesForm' && <AddCategoriesForm />}
{currentView === 'AddSubCategoriesForm' && <AddSubCategoriesForm />}
 </div>
  );
}

export default AddCategory;
