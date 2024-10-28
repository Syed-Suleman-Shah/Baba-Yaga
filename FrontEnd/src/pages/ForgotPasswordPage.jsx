// src/pages/ForgotPasswordPage.js
import React from 'react';
import ForgotPassword from '../components/Auth/ForgotPassword';
import { authService } from '../services/authService';

function ForgotPasswordPage() {
  return <ForgotPassword onResetPassword={authService.resetPassword} />;
}

export default ForgotPasswordPage;
