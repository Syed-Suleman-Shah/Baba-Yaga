import React, { useState } from "react";
import "./DashBoard.css";
import dollor from "./icons/dollor.png";
import reviews from "./icons/reviews.png";
import sales from "./icons/sales.png";
import data from "../../mockJsons/orderData.json";

export const DashBoardView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  // Calculate the range of rows to display based on the current page
  const startIndex = currentPage * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if ((currentPage + 1) * rowsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="grid-container">
        <div className="grid-item">
          <div className="icon">
            <img src={reviews} alt="Girl in a jacket" />
          </div>
          <div className="name">
            <h3>Reviews</h3>
          </div>
        </div>

        <div className="grid-item">
          <div className="icon">
            <img src={dollor} alt="Girl in a jacket" />
          </div>
          <div className="name">
            <h3>Revenue</h3>
          </div>
        </div>

        <div className="grid-item">
          <div className="icon">
            <img src={sales} alt="Girl in a jacket" />
          </div>
          <div className="name">
            <h3>Sales</h3>
          </div>
        </div>
      </div>

      <div className="orderTable">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Customer</th>
              <th>Payment Method</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {/* <td>{item.item}</td> */}
                <td>
                  <img
                    className="image-fluid"
                    src={item.item}
                    alt={`Profile of ${item}`}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{item.first_name}</td>
                <td>{item.payment}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div>
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * rowsPerPage >= data.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
