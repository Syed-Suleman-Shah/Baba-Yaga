import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './order.css'; // Importing the updated CSS
import data from '../../mockJsons/productData.json';
const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const rowsPerPage = 5;
  
    // Fetch order data from the backend
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/orders", {
            params: {
              page: currentPage + 1, // Backend is 1-based, React is 0-based
              limit: rowsPerPage,
            },
          });
          setOrders(response.data.orders);
          setTotalOrders(response.data.totalOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
  
      fetchOrders();
    }, [currentPage]);
  
    // Pagination handlers
    const handleNext = () => {
      if ((currentPage + 1) * rowsPerPage < totalOrders) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div className="table-container">
        <table>
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
            {data.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item}</td>
                <td>{order.seller}</td>
                <td>{order.isNew ? 'Yes' : 'No'}</td>
                <td>${order.price}</td>
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
            disabled={(currentPage + 1) * rowsPerPage >= totalOrders}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderList;