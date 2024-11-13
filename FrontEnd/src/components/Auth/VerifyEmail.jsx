import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Common/InputFields";
import { useAuthService } from "../../services/authService";

function VerifyEmail() {
  const [verificationToken, setCode] = useState("");
  const { verifyEmail, isLoading, resendVerificationCode } = useAuthService();
  const navigate = useNavigate();
  const { errorMessage, setError, clearError } = useAuthService();
  const { user } = useAuthService();
  const userEmail = user?.email;

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  const handleVerify = async (e) => {
    e.preventDefault();

    if (errorMessage === "Invalid or expired verification code") {
      setError(errorMessage);
      setTimeout(() => {
        clearError();
      }, 3000);
      return;
    }
    const user = await verifyEmail(verificationToken);
    console.log(user);
    if (user && user.role) {
      if (user.role === "seller") {
        navigate("/seller");
      } else {
        console.log(user.role);
      }
    } else {
      console.error("User or role is undefined");
    }
  };
  const handleResendCode = async () => {
    // Logic for resending the verification code
    try {
      const message = await resendVerificationCode(userEmail); // Pass the email here
      console.log("Verification code resent:", message);
    } catch (error) {
      setError("Failed to resend verification code.");
      console.error("Resend failed", error);
    }
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
              placeholder="######"
              value={verificationToken}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger">{`${errorMessage}`}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Verify"}
          </button>
          <p className="text-center mt-3">
            Didn't receive the code?{" "}
            <span
              className="text-link"
              style={{ cursor: "pointer" }}
              onClick={handleResendCode}
            >
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
