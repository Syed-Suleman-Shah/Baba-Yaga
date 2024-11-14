import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Alert } from 'react-bootstrap'; // Import Bootstrap components

const UserProfileView = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/view-users/display-user/${id}`);
        setUser(response.data.user);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" variant="primary" /> {/* Spinner while loading */}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    ); // Display error message
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>{user.name}'s Profile</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Email:</h5>
              <p>{user.email}</p>
            </div>
            <div className="col-md-6">
              <h5>Role:</h5>
              <span className={`badge bg-${user.role === 'admin' ? 'primary' : 'success'}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          {/* Additional profile fields */}
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Date Joined:</h5>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6">
              <h5>Last Login:</h5>
              <p>{new Date(user.lastLogin).toLocaleString()}</p>
            </div>
          </div>

          {/* Example if you want to add more user-specific details */}
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Status:</h5>
              <p>{user.status ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="col-md-6">
              <h5>Orders:</h5>
              <p>{user.orders?.length || 0} Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
