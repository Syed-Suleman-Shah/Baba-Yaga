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

function App() {
  // protect pages from concurrent access
  const ProtectPages = ({ children }) => {
    const { isAuthenticated, user } = useAuthService();
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    if (user && !user.isVerified) {
      return <Navigate to="/verify-email" replace />;
    }
    return children;
  };

  // redirectAuthenticated users to the pages
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthService();
    if (isAuthenticated && user?.isVerified) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthService();
  useEffect(() => {
    if (isCheckingAuth) {
      checkAuth();
    }
  }, [checkAuth]);
  

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
          <Route path="/VerifyEmail" element={<VerifyEmailPage />} />
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
