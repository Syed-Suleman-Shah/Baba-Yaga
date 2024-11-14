import React, { useState } from 'react';
import data from '../../mockJsons/productData.json';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';
import { Link } from 'react-router-dom';
import './productstyle.css';

function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentView, setCurrentView] = useState('category'); // Manage views: products, editCategory, addCategory
  const rowsPerPage = 7;

   const filteredData = data.filter((item) => item.id.toString().includes(searchTerm));
  const startIndex = currentPage * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if ((currentPage + 1) * rowsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Seller</th>
                <th>New</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link to="/detailedProduct">
                      <img src={item.product} alt={`Product of ${item.seller}`} width="50" height="50" />
                    </Link>
                  </td>
                  <td>{item.seller}</td>
                  <td>{item.new}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

           <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 0}>
              Previous
            </button>
            <span>Page {currentPage + 1}</span>
            <button
              onClick={handleNext}
              disabled={(currentPage + 1) * rowsPerPage >= filteredData.length}
            >
              Next
            </button>
          </div>
        </>
      )}
       {currentView === 'addCategory' && <AddCategory />}
       {currentView === 'editCategory' && <EditCategory />}
      {currentView === 'deleteCategory' && <DeleteCategory categories={data} />}
    </div>
  );
}

export default CategoryManagement;

