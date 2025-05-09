import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Shared/Navbar';
import '../styles/global.css';

const MyAccountPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Minha Conta</h2>
        <p><strong>Nome:</strong> {user?.name}</p>
        <p><strong>E-mail:</strong> {user?.email}</p>
        <p><strong>Telefone:</strong> {user?.phone}</p>
      </div>
    </>
  );
};

export default MyAccountPage;