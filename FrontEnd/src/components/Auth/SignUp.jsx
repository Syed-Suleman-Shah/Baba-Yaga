import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Common/InputFields";
import "./AuthForm.css";
import { useAuthService } from "../../services/authService";

// ==
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [isAgreeToTerms, setAgreeToTerms] = useState();
  const { signup, isLoading } = useAuthService();
  const navigate = useNavigate();
  const { errorMessage, setError, clearError } = useAuthService();

  useEffect(() => {
    
    const savedName = localStorage.getItem("name");
    if (savedName) {
      setEmail(savedName);
    }
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setEmail(savedRole);
    }
  }, []);
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (errorMessage === "User Name is required") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000); // 5000ms = 5 seconds
        return;
      }

      if (errorMessage === "User Email is required") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      if (errorMessage === "User Password is required") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      if (errorMessage === "Password should be at least 8 characters long") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      if (errorMessage === "Confirm Password is required") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      if (errorMessage === "Passwords do not match") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      if (errorMessage === "Please agree to the terms and conditions") {
        setError("Please agree to the terms and conditions");
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      if (errorMessage === "User already exists") {
        setError(errorMessage);
        setTimeout(() => {
          clearError();
        }, 5000);
        return;
      }

      await signup(
        name,
        email,
        password,
        confirmPassword,
        role,
        isAgreeToTerms
      );
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      navigate("/Verify-Email");
    } catch (err) {}
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

          <InputField
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          {errorMessage && (
            <div className="alert alert-danger">{`${errorMessage}`}</div>
          )}
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={isAgreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              I agree to the{" "}
              <Link to="/terms" className="text-link">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/signin" className="text-link">
              Login
            </Link>
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

export default SignUp;
