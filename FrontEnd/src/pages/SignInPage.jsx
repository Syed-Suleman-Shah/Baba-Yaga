// src/pages/SignInPage.js
import React from 'react';
import SignIn from '../components/Auth/SignIn';
import { authService } from '../services/authService';

function SignInPage() {
  return <SignIn onSignIn={authService.signIn} />;
}

export default SignInPage;
