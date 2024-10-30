import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import InputField from '../Common/InputFields';
import './AuthForm.css';
import { useAuthService } from '../../services/authService';

function ForgotPassword({ onResetPassword }) {
  const [email, setEmail] = useState('');  
  const {resetPassword , error , isLoading} = useAuthService();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if(!email) {
      return;
    }
    await resetPassword(email);
    
  };

  return (

    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Forgot Password</h2>
        
        <form onSubmit={handleForgotPassword}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-message">{`${error}`}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
          <p className="text-center mt-3">
            <Link to="/signin" className="text-link">Login</Link>
          </p>
        </form>
      </div>
      <div className="image-section col-12 col-md-6 d-none d-md-block">
      <h3>What is Lorem Ipsum?</h3>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

      </div>


    </div>
  );
}

export default ForgotPassword;
