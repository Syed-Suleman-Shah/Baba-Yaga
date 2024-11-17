import React, { useState } from 'react';
import data from '../../mockJsons/productData.json';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';
import { Link } from 'react-router-dom';
import DetailedProductView from './DetailedProductView';
import './productstyle.css';

function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentView, setCurrentView] = useState('category'); // Manage views: products, editCategory, addCategory
  const rowsPerPage = 7;



  return (
    <div className="product-management">
       <nav className="navbar">
        <div className="tabs">
          <button onClick={() => { setCurrentView('category'); setCurrentPage(0); }}>Categories</button>
          <button onClick={() => setCurrentView('editCategory')}>Edit Category</button>
          <button onClick={() => setCurrentView('addCategory')}>Add Category</button>
          <button onClick={() => setCurrentView('deleteCategory')}>Delete Category</button>
        </div>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);  
          }}
          className="search-bar"
        />
      </nav>
 
      {currentView === 'category' && (
    <>
    <DetailedProductView />
    </>
      )}
       {currentView === 'addCategory' && <AddCategory />}
       {currentView === 'editCategory' && <EditCategory />}
      {currentView === 'deleteCategory' && <DeleteCategory categories={data} />}
    </div>
  );
}

export default CategoryManagement;

