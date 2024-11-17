import React, { useState } from "react";
import "./productstyle.css"; 
import { Del_P } from "./Del_P";
import{Del_C} from "./Del_C.jsx";

function DeleteCategory() {
  const [currentView, setCurrentView] = useState("deleteCategory"); 
  return (
    <div className="add-category-form">
      <div className="tabs">
        <button
          onClick={() => {
            setCurrentView("Del_P");  
          }}
        >
          Delete Category
        </button>
        <button
          onClick={() => {
            setCurrentView("Del_C");
          }}
        >
          Delete SubCategory
        </button>
      </div>
      {currentView === "Del_P" && <Del_P />}
      {currentView === "Del_C" && <Del_C />}
    </div>
  );
}

export default DeleteCategory;
