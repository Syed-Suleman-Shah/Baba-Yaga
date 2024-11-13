// import React, { useState } from 'react';
// import data from '../../mockJsons/productData.json';
// import AddCategory from './AddCategory';

// function ProductManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 7;

//   // Filter data based on the search term
//   const filteredData = data.filter(
//     (item) =>
//       // item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       // item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.id.toString().includes(searchTerm)
//   );

//   // Calculate pagination
//   const startIndex = currentPage * rowsPerPage;
//   const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

//   const handleNext = () => {
//     if ((currentPage + 1) * rowsPerPage < filteredData.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="App">
//       {/* Navbar with Tabs and Search Bar */}
//       <nav className="navbar">
//         <div className="tabs">
//           <button onClick={() => setCurrentPage(0)}>Home</button>
//           <button onClick={() => setCurrentPage(AddCategory)}>Orders</button>
//           <button onClick={() => setCurrentPage(AddCategory)}>Profile</button>
//         </div>
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(0); // Reset to first page when search term changes
//           }}
//           className="search-bar"
//         />
//       </nav>

//       {/* Table to Display Data */}
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Item</th>
//             <th>Seller</th>
//             <th>New</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td><img src={item.product} alt={`Profile of ${item}`} width="50" height="50" /></td>
//               <td>{item.seller}</td>
//               <td>{item.new}</td>
//               <td>{item.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Buttons */}
//       <div className="pagination">
//         <button onClick={handlePrevious} disabled={currentPage === 0}>
//           Previous
//         </button>
//         <span>Page {currentPage + 1}</span>
//         <button
//           onClick={handleNext}
//           disabled={(currentPage + 1) * rowsPerPage >= filteredData.length}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductManagement;


import React, { useState } from 'react';
import data from '../../mockJsons/productData.json';
import AddCategory from './AddCategory';
import { Link } from 'react-router-dom';

function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentView, setCurrentView] = useState('products'); // Added state to manage view
  const rowsPerPage = 7;

  // Filter data based on the search term
  const filteredData = data.filter(
    (item) => item.id.toString().includes(searchTerm)
  );

  // Calculate pagination
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
    <div className="App">
      {/* Navbar with Tabs and Search Bar */}
      <nav className="navbar">
        <div className="tabs">
          <button onClick={() => { setCurrentView('products'); setCurrentPage(0); }}>Home</button>
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
            setCurrentPage(0); // Reset to first page when search term changes
          }}
          className="search-bar"
        />
      </nav>

      {/* Render based on current view */}
      {currentView === 'products' && (
        <>
          {/* Table to Display Data */}
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
                  <Link to="./detailedProduct"><td><img src={item.product} alt={`Profile of ${item}`} width="50" height="50" /></td></Link>
                  <td>{item.seller}</td>
                  <td>{item.new}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Buttons */}
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

      {/* Render AddCategory component when 'Add Category' is selected */}
      {currentView === 'addCategory' && <AddCategory />}
      {/* You can also add a Profile component or any other component for 'Profile' */}
    </div>
  );
}

export default ProductManagement;
