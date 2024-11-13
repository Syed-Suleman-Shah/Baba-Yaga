import React from 'react';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import userData from '../../mockJsons/mockDataUsers.json';

const UserProfileView = () => {
    const { id } = useParams();
    const user = userData.find((user) => user.id === parseInt(id, 10)); // Convert id to integer for comparison
  
    if (!user) {
      return <p>User not found. Please check the ID.</p>; // Handle the case where user is not found
    }



  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      
      <div className="row">
        {/* Personal Info Card */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Personal Info</h5>
            </div>
            <div className="card-body text-center">
              <img 
                src={user.picture || 'https://via.placeholder.com/100'} 
                alt="User" 
                className="rounded-circle mb-3" 
                style={{ width: '100px', height: '100px' }}
              /> 
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.user_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Address</h5>
            </div>
            <div className="card-body">
              <p>{user.address}</p>
            </div>
          </div>
        </div>
        
        {/* Payment Info Card */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Payment Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Card Number:</strong> {user.card_number || "Not Provided"}</p>
            </div>
          </div>
        </div>

        {/* Date of Joining Card */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Date of Joining</h5>
            </div>
            <div className="card-body">
              <p>{user.date_registered}</p>
            </div>
          </div>
        </div>

        {/* Delete User Button */}
        <div className="col-12 text-center mt-4">
          <button className="btn btn-danger">Delete User</button>
        </div>
      </div>
    </div>
  );

};

export default UserProfileView;
