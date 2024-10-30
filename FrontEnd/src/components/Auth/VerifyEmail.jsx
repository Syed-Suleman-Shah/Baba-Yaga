import React, { useState } from "react";
import "./AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Common/InputFields";
import { useAuthService } from "../../services/authService";
import VerificationInput from "react-verification-input";

function VerifyEmail() {
  const [verificationToken, setCode] = useState("");
  const [err, setError] = useState("");
  const { verifyEmail, error, isLoading } = useAuthService();
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationToken) {
      setError("Please enter the code");
      return;
    }
    if (verificationToken < 6) {
      setError("Please enter a valid code");
      return;
    }
    await verifyEmail(verificationToken);
    navigate(`/Admin`, { replace: true });
  };
  return (
    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-subtitle">
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleVerify}>
          <div className="d-flex justify-content-center">
            <InputField
              type="text"
              placeholder="code"
              value={verificationToken}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {err && <p className="error">{err}</p>}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Verify"}
          </button>
          <p className="text-center mt-3">
            Didn't receive the code?{" "}
            <span className="text-link" style={{ cursor: "pointer" }}>
              Resend
            </span>
          </p>
        </form>
      </div>

      <div className="image-section col-12 col-md-6 d-none d-md-block">
        <h3>What is Lorem Ipsum?</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
