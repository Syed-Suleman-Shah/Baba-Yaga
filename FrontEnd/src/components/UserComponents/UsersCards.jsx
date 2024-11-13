import React from 'react';
// import userData from '..//../mockJsons/mockDataUsers.json'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import './UserComponents.css';

const UserCards = () => {

    return (
        
        <div className="container-row">
        <Link className='links' to="/admin/users/mod">
            {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Moderators</h5>
                </div>
              </div>
            </div> */}
            <div className="grid-item">
                    <div className="name"><h3 className='title'>Moderators</h3></div>    
                </div>
            </Link>
            
            <Link className='links' to = "/admin/users/seller">
            
            <div className="grid-item">
                    <div className="name"><h3>Sellers</h3></div>    
                </div>
            </Link>

            <Link className='links' to="/admin/users/buyer">
            {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Buyers</h5>
                </div>
              </div>
            </div> */}
            <div className="grid-item">
                    <div className="name"><h3>Buyers</h3></div>    
                </div>
            </Link>
            
        </div>
    );
  };
  
  export default UserCards;
