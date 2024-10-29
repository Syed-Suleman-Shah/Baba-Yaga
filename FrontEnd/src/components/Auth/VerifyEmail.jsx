import React, { useState } from 'react';
import './AuthForm.css';

function VerifyEmail({ onVerify }) {
  const [code, setCode] = useState('');

  
  const handleVerify = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    } else {
      alert('Please enter a valid 6-digit code');
    }
  };

  return (
    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-subtitle">Enter the 6-digit code sent to your email</p>
        
        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Verify
          </button>
          
          <p className="text-center mt-3">
            Didn't receive the code? <span className="text-link" style={{ cursor: 'pointer' }}>Resend</span>
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

export default VerifyEmail;
