import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserBuyer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('token');
  console.log(token);
  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/view-users/buyers", {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (Array.isArray(response.data.buyers)) {
        setData(response.data.buyers);
      } else {
        console.error('Unexpected response format', response.data);
        setData([]);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
  }, [token]);

  const getStatusBadgeClass = (role) => {
    switch(role) {
      case 'admin':
        return 'bg-primary';
      case 'seller':
        return 'bg-success';
      case 'moderator':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.length === 0 ? (
        <p>No Buyers available</p>
      ) : (
        <div className="container mt-4">
          <h2 className="mb-3">Buyers Data</h2>
          <div className="table-responsive d-none d-md-block">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>First-Name</th>
                  <th>Email</th>
                  {/* <th>Gender</th> */}

                  <th>Role</th>
                  <th>Date of Joining</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id} className="border-bottom">
                    <td>{user._id}</td>
                    <td>
                      <Link to={`/admin/users/user/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.email}</td>
                    {/* <td>{user.gender}</td> */}
            
                    <td>
                      <span className={`badge ${getStatusBadgeClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Responsive card view for mobile devices */}
          <div className="d-md-none">
            {data.map((user) => (
              <div key={user.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/${user.name}`} className="text-dark fw-bold">
                      {user.name}
                    </Link>
                  </h5>
                  <p className="card-text"><strong>Email:</strong> {user.email}</p>
                  {/* <p className="card-text"><strong>Gender:</strong> {user.gender}</p> */}
                  {/* <p className="card-text"><strong>Username:</strong> {user.user_name}</p> */}
                  {/* <p className="card-text"><strong>Address:</strong> {user.address}</p> */}
                  <p className="card-text"><strong>Role:</strong> <span className={`badge ${getStatusBadgeClass(user.role)}`}>{user.role}</span></p>
                  <p className="card-text"><strong>Date of Joining:</strong> {user.date_registered}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBuyer;
