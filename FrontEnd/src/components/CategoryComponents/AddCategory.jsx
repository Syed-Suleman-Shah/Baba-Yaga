import React, { useState } from "react";
import "./productstyle.css"; 
import { AddCategoriesForm, AddSubCategoriesForm } from "./addCategoriesForm";
function AddCategory() {
  const [currentView, setCurrentView] = useState("addCategory"); 
  return (
    <div className="add-category-form">
      <div className="tabs">
        <button
          onClick={() => {
            setCurrentView("AddCategoriesForm");  
          }}
        >
          Add Category
        </button>
        <button
          onClick={() => {
            setCurrentView("AddSubCategoriesForm");
          }}
        >
          Add SubCategory
        </button>
      </div>
      {currentView === "AddCategoriesForm" && <AddCategoriesForm />}
      {currentView === "AddSubCategoriesForm" && <AddSubCategoriesForm />}
    </div>
  );
}

export default AddCategory;
