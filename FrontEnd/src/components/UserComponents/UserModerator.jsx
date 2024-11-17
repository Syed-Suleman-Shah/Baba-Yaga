import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaBan } from "react-icons/fa";
import './UserComponents.css'; // Ensure styles are correct
import EditUserModal from "./EditUser"; // Import the modal
import UserProfileView from "./UserProfileView";
const UserModerator = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user for editing
  const [showEditModal, setShowEditModal] = useState(false); // Show/hide the modal
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/view-users/moderators", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.moderators)) {
          setData(response.data.moderators);
          setFilteredData(response.data.moderators);
        } else {
          console.error("Unexpected response format", response.data);
          setData([]);
          setFilteredData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [token]);

  const getStatusBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-primary";
      case "seller":
        return "bg-success";
      case "moderator":
        return "bg-warning";
      case "banned":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleBanToggle = (id, currentRole) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${currentRole === "banned" ? "unban" : "ban"} this user?`
    );
    
    if (confirmAction) {
      const endpoint =
        currentRole === "banned"
          ? `http://localhost:5000/api/admin/view-users/unban-user/${id}`
          : `http://localhost:5000/api/admin/view-users/ban-user/${id}`;
  
      axios
        .put(endpoint, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(`${currentRole === "banned" ? "User unbanned" : "User banned"} successfully!`);
          setData((prevData) =>
            prevData.map((user) =>
              user._id === id
                ? { ...user, role: currentRole === "banned" ? "seller" : "banned" }
                : user
            )
          );
        })
        .catch((error) => {
          console.error(`${currentRole === "banned" ? "Unban" : "Ban"} error:`, error);
          alert(`Failed to ${currentRole === "banned" ? "unban" : "ban"} user!`);
        });
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId); // Set the user ID to be edited
    setShowEditModal(true); // Show the edit modal
  };

  const handleModalClose = () => {
    setShowEditModal(false); 
    setSelectedUserId(null); 
  };

  const handleUserUpdated = () => {
     console.log("User updated, refresh list if necessary.");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.length === 0 ? (
        <p>No Moderators available</p>
      ) : (
        <div className="container mt-4">
          <h2 className="mb-3">Moderators Data</h2>

          {/* Search Bar */}
          <div className="search-container mb-3">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="table-responsive d-none d-md-block">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>First-Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Date of Joining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id} className="border-bottom">
                    <td>{user._id}</td>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(user.role)}`}
                        style={user.role === "seller" ? { color: '#fff', backgroundColor: '#1A2B49' } : {}}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      {/* Edit Button */}
                      <button className="btn btn-warning me-2" onClick={() => handleEditClick(user._id)}>
                        <FaEdit className="me-2" /> Edit
                      </button>

                      {/* Ban/Unban Button */}
                      <button
                        className={`btn ${user.role === "banned" ? "btn-success" : "btn-danger"} me-2`}
                        onClick={() => handleBanToggle(user._id, user.role)}
                      >
                        <FaBan className="me-2" /> {user.role === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit User Modal */}
          {selectedUserId && (
            <EditUserModal
              userId={selectedUserId}
              show={showEditModal}
              handleClose={handleModalClose}
              onUserUpdated={handleUserUpdated}
            />
          )}
            {selectedUserId && (
            <UserProfileView
              userId={selectedUserId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserModerator;
