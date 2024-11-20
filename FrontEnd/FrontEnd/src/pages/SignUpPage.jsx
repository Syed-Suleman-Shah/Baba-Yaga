// src/pages/SignUpPage.js
import React from 'react';
import SignUp from '../components/Auth/SignUp';
import { authService } from '../services/authService';

function SignUpPage() {
  return <SignUp onSignUp={authService.signUp} />;
}

export default SignUpPage;
