import React, { useEffect, useState } from 'react';
import productData from '../../mockJsons/productData.json'; 
// import AddCategory from './AddCategory';
import { Link } from 'react-router-dom';


export const AddCategory =()=> {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    const newCategory = {
      name: categoryName,
      description,
      // image, // This would need to be processed if you're uploading the file to a server
    };

    console.log('New Category:', newCategory);

    // Clear the form after submission
    setCategoryName('');
    setDescription('');
    // setImage(null);
    setError('');
    alert('Category added successfully!');
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith('image/')) {
  //     setImage(file);
  //     setError(''); // Clear previous error
  //   } else {
  //     setError('Please upload a valid image file.');
  //   }
  // };

  return (
    <div className="add-category-form">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
          ></textarea>
        </div>

        {/* <div>
          <label>Category Image (optional):</label>
          <input type="file" onChange={handleImageChange} />
          {image && <img src={URL.createObjectURL(image)} alt="Category Preview" width="100" />}
        </div> */}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export const DetailedProductView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load the product data from the JSON file
    setProducts(productData);
  }, []);

  return (
    <div className="product-grid">
      <h2>Product List</h2>
      <div className="grid-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.product} alt={product.name} className="product-image" />
            <p>Seller: {product.seller}</p>
            {/* <p>Price: ${product.price.toFixed(2)}</p> */}
            <p>Price: ${product.price}</p>
            <p>State: {product.new}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export const ProductManagement =()=> {
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
