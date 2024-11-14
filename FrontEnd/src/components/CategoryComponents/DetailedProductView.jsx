import React, { useEffect, useState } from 'react';
import productData from '../../mockJsons/productData.json'; // Adjust the import based on your file structure
import './productstyle.css'; // Make sure to include the styles

const DetailedProductView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load the product data from the JSON file
    setProducts(productData);
  }, []);

  return (
    <div className="product-grid">
      <h2 className="grid-title">Product List</h2>
      <div className="grid-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-card-image-container">
              <img src={product.product} alt={product.name} className="product-image" />
            </div>
            <div className="product-card-details">
              <h3>{product.name}</h3>
              <p className="product-seller">Seller: {product.seller}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-state">State: {product.new}</p>
            </div>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedProductView;
