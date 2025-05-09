import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/global.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, name, phone);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Registrar</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          className="input"
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button className="button button-primary" type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;