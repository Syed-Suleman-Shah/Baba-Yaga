import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './components.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-sticky">
          <h4 className="sidebar-heading">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashbord">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                User Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Product Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">
                Order Management
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
