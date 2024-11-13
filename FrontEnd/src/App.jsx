import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import { useAuthService } from "./services/authService";
import { AdminRoutes } from "./pages/AdminRoutes";
import NotFound from './components/NotFound';
import './App.css';
function App() {
  const { isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthService();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Add a loading state while checking authentication
  }

  return (
    <Router>
      <Routes>
        {/* Non-admin routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminRoutes />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
