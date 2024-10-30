import React , {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminPage from './pages/AdminPage';
import { useAuthService } from './services/authService';

function App() {

  const {isCheckingAuth , checkAuth , isAuthenticated , user} = useAuthService();
  useEffect(() => {
    if(isCheckingAuth) {
      checkAuth();
    }
  }, [checkAuth]);
  console.log('Is Authenticated', isAuthenticated);
  console.log('user Data', user);
  return (
// ==
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/VerifyEmail" element={<VerifyEmailPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path='Admin' element={<AdminPage />} />
        </Routes>
      </div>
    </Router> 
    
  );
}

export default App;
