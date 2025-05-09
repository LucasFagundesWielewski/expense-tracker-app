import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/global.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button button-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;