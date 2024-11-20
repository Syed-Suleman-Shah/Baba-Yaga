
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import InputField from '../Common/InputFields';
import './AuthForm.css';

// ==
function SignUp({ onSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeToTerms) {
      alert('You must agree to the terms and conditions!');
      return;
    }
    onSignUp({ name, email, password });

    navigate('/VerifyEmail');

  };

  return (
    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-subtitle">Create an account to get started!</p>
        
        <form onSubmit={handleSignUp}>
          <InputField
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <small>Password must be 8 characters long</small>

          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              I agree to the <Link to="/terms" className="text-link">Terms and Conditions</Link>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
          
          <p className="text-center mt-3">
            Already have an account? <Link to="/signin" className="text-link">Login</Link>
          </p>
        </form>
      </div>
      
      <div className="image-section col-12 col-md-6 d-none d-md-block">
        <h3>What is Lorem Ipsum?</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
    </div>
  );
}

export default SignUp;
