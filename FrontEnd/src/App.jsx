import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import { useAuthService } from "./services/authService";

const ProtectPages = ({ children }) => {
  const { isCheckingAuth, isAuthenticated, user } = useAuthService();

  console.log(user);
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-Email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthService();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {
  const { isCheckingAuth, checkAuth } = useAuthService();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div></div>;
  }

  return (
    // ==
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectPages>
                <HomePage />
              </ProtectPages>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/signin"
            element={
              <RedirectAuthenticatedUser>
                <SignInPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route path="/verify-Email" element={<VerifyEmailPage />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="Admin"
            element={
              <ProtectPages>
                <AdminPage />
              </ProtectPages>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
