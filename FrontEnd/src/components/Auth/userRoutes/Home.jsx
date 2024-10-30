import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from '../../../services/authService';

function Home() {
  
 
  const { signout, error, isLoading } = useAuthService();
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    await signout();
    navigate(`/signin`, { replace: true });
  };
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home Page!</p>
      <form onSubmit={handleVerify}>
      <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "logout"}
          </button>
        </form>
    </div>
  )
}

export default Home
