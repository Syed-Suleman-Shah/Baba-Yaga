import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmail from './components/Auth/VerifyEmail';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (

    <Router>
      <div className="container">
        <Routes>

          <Route path="/" element={<Navigate to="/signin" />} />

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/VerifyEmail" element={<VerifyEmail />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
    </Router> 
    
  );
}

export default App;
