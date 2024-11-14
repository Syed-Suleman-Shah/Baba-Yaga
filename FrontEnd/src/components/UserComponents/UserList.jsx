import React, { useState } from "react";
import EditUserModal from "./EditUserModal";

const UsersList = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleUserUpdated = () => {
    // Code to refresh user list after update
    console.log("User updated, refresh the user list if necessary.");
  };

  return (
    <div className="container">
      <h2>User List</h2>

      {/* Example user list */}
      <ul>
        <li>
          John Doe
          <button onClick={() => handleEditClick("user1")}>Edit</button>
        </li>
        <li>
          Jane Smith
          <button onClick={() => handleEditClick("user2")}>Edit</button>
        </li>
      </ul>

      <EditUserModal
        userId={selectedUserId}
        show={showModal}
        handleClose={handleCloseModal}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default UsersList;
