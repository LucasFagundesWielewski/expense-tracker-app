import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { login, register, resetPassword, user, logout } = context;

  return {
    login,
    register,
    resetPassword,
    user,
    logout,
  };
};

export default useAuth;