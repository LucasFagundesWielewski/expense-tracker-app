import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Shared/Navbar';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordResetPage from './pages/PasswordResetPage';
import MyAccountPage from './pages/MyAccountPage';
import ExpenseFormScreen from './pages/ExpenseFormScreen';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar is rendered here */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/expenses" element={<ExpenseFormScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;