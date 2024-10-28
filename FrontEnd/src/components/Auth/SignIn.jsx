import React, { useState } from 'react';
import InputField from '../Common/InputFields';
import './AuthForm.css';
import { Link } from 'react-router-dom';

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    onSignIn({ email, password });
  };

  return (
    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Sign In</h2>
        <p className="auth-subtitle">Welcome back! Please enter your details.</p>
        
        <form onSubmit={handleSignIn}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-link">
              Forgot your password?
            </Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup" className="text-link">Create account</Link>
          </p>
        </form>
      </div>
      <div className="image-section col-12 col-md-6 d-none d-md-block">
        {/* <img src="" alt="Illustration" className="img-fluid" /> */}
        <h3>What is Lorem Ipsum?</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
      </div>
    </div>
  );
}

export default SignIn;
