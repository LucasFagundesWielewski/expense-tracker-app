import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/global.css';

const PasswordResetPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await resetPassword(email);
      setMessage('Verifique seu e-mail para redefinir a senha.');
    } catch (err) {
      setError('Erro ao redefinir a senha. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="button button-primary" type="submit">Redefinir Senha</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PasswordResetPage;