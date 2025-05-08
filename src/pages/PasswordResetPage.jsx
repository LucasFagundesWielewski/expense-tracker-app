import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

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
      setMessage('Check your email for password reset instructions.');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="password-reset-page">
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PasswordResetPage;