import React, { useState } from 'react';
import './productstyle.css';
import { EditCategoriesForm } from "./EditCategoriesForm.jsx";
import {EditSubCategoriesForm} from "./EditSubCategoriesForm.jsx";

function EditCategory() {
  const [currentView, setCurrentView] = useState("editCategory"); 
  return (
    <div className="add-category-form">
      <div className="tabs">
        <button
          onClick={() => {
            setCurrentView("EditCategoriesForm");  
          }}
        >
          Edit Category
        </button>
        <button
          onClick={() => {
            setCurrentView("EditSubCategoriesForm");
          }}
        >
          Edit SubCategory
        </button>
      </div>
      {currentView === "EditCategoriesForm" && <EditCategoriesForm />}
      {currentView === "EditSubCategoriesForm" && <EditSubCategoriesForm />}
    </div>
  );
}

export default EditCategory;
