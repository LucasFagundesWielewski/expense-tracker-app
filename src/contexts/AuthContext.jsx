import React, { createContext, useContext, useState } from 'react';
import { auth } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const userData = await auth.login(email, password);
    setUser(userData);
  };

  const register = async (email, password, name, phone) => {
    const userData = await auth.register(email, password, name, phone);
    setUser(userData);
  };

  const resetPassword = async (email) => {
    await auth.resetPassword(email);
  };

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};